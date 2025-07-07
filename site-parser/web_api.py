# main.py

from fastapi import FastAPI, File, Form, UploadFile, Request
from fastapi.responses import HTMLResponse, JSONResponse, FileResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
import os
import shutil
import tempfile
from web_scraper_browser import scrape_page
from job_manager import create_job, update_job, get_job_status

app = FastAPI()

templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/scrape", response_class=HTMLResponse)
async def scrape(
    request: Request,
    url: str = Form(...),
    folder_name: str = Form(None),
    questions_file: UploadFile = File(None)
):
    temp_question_path = None
    if questions_file:
        temp_dir = tempfile.mkdtemp()
        temp_question_path = os.path.join(temp_dir, questions_file.filename)
        with open(temp_question_path, "wb") as f:
            shutil.copyfileobj(questions_file.file, f)

    try:
        report = await scrape_page(url=url, folder_name=folder_name, questions_file=temp_question_path)
        report_path = os.path.join("reports", report["id"], "report.json")

        return templates.TemplateResponse(
            "results.html", 
            {"request": request, "report": report, "report_path": report_path}
        )
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
    finally:
        if temp_question_path:
            os.remove(temp_question_path)
            shutil.rmtree(os.path.dirname(temp_question_path), ignore_errors=True)

@app.get("/download/{folder}/{filename}")
async def download_file(folder: str, filename: str):
    path = os.path.join("reports", folder, filename)
    if not os.path.exists(path):
        return JSONResponse(status_code=404, content={"error": "File not found"})
    return FileResponse(path, filename=filename)
