'use strict';

import express from 'express';
import { phoneController } from '../controllers/phones.controller.js';

export const phonesRouter = express.Router();

phonesRouter.get('/', phoneController.getPhones);
phonesRouter.get('/:phoneId', phoneController.getPhoneById);
