'use strict';

import express from 'express';
import { tabletController } from '../controllers/tablet.controller.js';

export const tabletRouter = express.Router();

tabletRouter.get('/', tabletController.getTablets);
tabletRouter.get('/:tabletId', tabletController.getTabletById);
