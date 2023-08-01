'use strict';

import express from 'express';
import cors from 'cors';
import { phonesRouter } from './routes/product.router.js';
import { initDB } from './utils/initDB.js';

export const createServer = () => {
  const app = express();

  initDB();

  app.use(cors());
  app.use('/products', express.json(), phonesRouter);
  app.use('/', (_, res) => {
    res.send('Hello world, it is HTML Hooligans');
  });

  return app;
};
