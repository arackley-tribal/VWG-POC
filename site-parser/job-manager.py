import uuid
import asyncio

job_status = {}

def create_job():
    job_id = str(uuid.uuid4())
    job_status[job_id] = {"status": "queued"}
    return job_id

def update_job(job_id, status, message=""):
    job_status[job_id] = {"status": status, "message": message}

def get_job_status(job_id):
    return job_status.get(job_id, {"status": "unknown"})
