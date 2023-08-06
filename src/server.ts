'use strict';

import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import { productRouter } from './routes/product.router.js';
import { initDB } from './utils/initDB.js';
import { phoneRouter } from './routes/phone.router.js';
import { tabletRouter } from './routes/tablet.router.js';
import { accessoryRouter } from './routes/accessory.router.js';

dotenv.config();

// const { CLIENT_URL } = process.env;

// const corsOptions = {
//   origin: CLIENT_URL,
//   credentials: true,
// };

const corsOptions = {
  origin: '*',
};

export const createServer = () => {
  const app = express();

  initDB();
  app.use(cors(corsOptions));
  app.use('/img', express.static(path.join('img')));
  app.use('/products', express.json(), productRouter);
  app.use('/phones', express.json(), phoneRouter);
  app.use('/tablets', express.json(), tabletRouter);
  app.use('/accessories', express.json(), accessoryRouter);

  app.use('/', (_, res) => {
    res.send('Hello world, it is HTML Hooligans');
  });

  return app;
};
