import express from 'express';
import type { Express } from 'express';
import cors from 'cors';
import { PORT } from './constants/constants.js';
import apiRouter from './routes/api.js';
import dotenv from 'dotenv';
import mysqlDb from './config/mysqlDb.js';

const app: Express = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);

const run = async () => {
  await mysqlDb.init();

  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
};

run().catch((error) => console.error(error));
