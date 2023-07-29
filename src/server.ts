'use strict';

import express from 'express';
import cors from 'cors';

import { phonesRouter } from './routes/phones.router.js';

export const createServer = () => {
  const app = express();

  app.use(cors());
  app.use('/phones', express.json(), phonesRouter);

  app.use('/', (_, res) => {
    res.send('Hello world, it is HTML Hooligans');
  });

  return app;
};
