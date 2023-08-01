'use strict';

import express from 'express';
import { productController } from '../controllers/product.controller.js';

export const phonesRouter = express.Router();

phonesRouter.get('/', productController.getProduct);
phonesRouter.get('/:productId', productController.getProductById);
