'use strict';

import express from 'express';

export const createServer = () => {
  const app = express();

  app.use('/', (req, res) => {
    res.send('Hello world, it is HTML Hooligans');
  });

  return app;
}
