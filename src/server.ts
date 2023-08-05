'use strict';

import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import { productRouter } from './routes/product.router.js';
import { initDB } from './utils/initDB.js';
import { phoneRouter } from './routes/phone.router.js';

dotenv.config();

const { CLIENT_URL } = process.env;

const corsOptions = {
  origin: CLIENT_URL,
  credentials: true,
};

export const createServer = () => {
  const app = express();

  initDB();
  app.use(cors(corsOptions));
  app.use('/img', express.static(path.join('img')));
  app.use('/', express.json(), productRouter);
  app.use('/phones', express.json(), phoneRouter);

  return app;
};
