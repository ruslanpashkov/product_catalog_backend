'use strict';

import express from 'express';
import { phoneController } from '../controllers/phone.controller.js';

export const phoneRouter = express.Router();

phoneRouter.get('/', phoneController.getPhones);
phoneRouter.get('/:phoneId', phoneController.getPhoneById);
