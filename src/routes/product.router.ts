'use strict';

import express from 'express';
import { productController } from '../controllers/product.controller.js';

export const productRouter = express.Router();

productRouter.get('/', productController.getProducts);
productRouter.get('/discount', productController.getProductsByDiscount);
