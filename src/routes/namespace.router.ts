'use strict';

import express from 'express';
import { namespaceController } from '../controllers/namespace.controller.js';

export const namespaceRouter = express.Router();

namespaceRouter.get('/', namespaceController.getProductId);
