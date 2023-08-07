'use strict';

import express from 'express';

export const userRouter = express.Router();

userRouter.get('/signup', (req, res) => {
  res.status(200).json({ message: 'signup' });
});
