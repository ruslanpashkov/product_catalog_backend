'use strict';

import express from 'express';
import path from 'path';
import cors from 'cors';
import { productRouter } from './routes/product.router.js';
import { initDB } from './utils/initDB.js';
// import { phoneRouter } from './routes/phone.router.js';

export const createServer = () => {
  const app = express();

  initDB();
  app.use(cors());
  app.use('/img', express.static(path.join('img')));
  app.use('/products', express.json(), productRouter);

  app.use('/', (_, res) => {
    res.send('Hello world, it is HTML Hooligans');
  });

  return app;
};
