import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from "./src/data-source"

const app = express();
const port = 3000;

AppDataSource.initialize().then(async () => {
  console.log('connection to database');
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}).catch(error => console.log(error));
