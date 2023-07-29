'use strict';

import express from 'express';
import {
  getAllPhonesController,
  getPhoneByIdController,
} from '../controllers/phones.controller.js';

export const phonesRouter = express.Router();

phonesRouter.get('/', getAllPhonesController);

phonesRouter.get('/:phoneId', getPhoneByIdController);
