import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import crypto from 'crypto';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

var encrypt = ((val : string, key: string, iv : string) => {
  let cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(val, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
});

app.get("/", (req: Request, res: Response) => {
 
  const encryptionKey = process.env.ENCRYPTION_KEY;
  const encryptionIVKey = process.env.ENCRYPTION_IV;
  if(!encryptionKey || !encryptionIVKey){
    return res.status(400).send('Invalid Key Setup');
  }

  const algoType = req.query.algoType
  if(!algoType && algoType !== 'aes-256-cbc'){
    return res.status(400).send('Invalid algorithm type');
  }

  const valueToEncrypt = req.query.value as string;
  if(!valueToEncrypt){
    return res.status(400).send('No value to encrypt provided')
  }

  return res.send(encrypt(valueToEncrypt, encryptionKey, encryptionIVKey))

});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});