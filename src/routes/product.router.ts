'use strict';

import express from 'express';
import { productController } from '../controllers/product.controller.js';

export const productRouter = express.Router();

productRouter.get('/', productController.getAllProducts);
productRouter.get('/discount', productController.getProductsByDiscount);
productRouter.get('/new', productController.getProductsByNew);
productRouter.get('/recommended', productController.getProductsByNew);

// /recommended?price=500
