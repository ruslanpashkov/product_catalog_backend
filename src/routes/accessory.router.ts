'use strict';

import express from 'express';
import { accessoryController } from '../controllers/accessory.controller.js';

export const accessoryRouter = express.Router();

accessoryRouter.get('/', accessoryController.getAccessories);
accessoryRouter.get('/:accessoryId', accessoryController.getAccessoryById);
