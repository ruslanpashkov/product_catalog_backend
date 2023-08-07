'use strict';

import express from 'express';
import { productController } from '../controllers/product.controller.js';

export const productRouter = express.Router();

productRouter.get('/', productController.getAllProducts);
productRouter.get('/discount', productController.getProductsByDiscount);
productRouter.get('/new', productController.getProductsByNew);
productRouter.get('/recommended', productController.getRecommendedProducts);

// /recommended?price=200&fullPrice=200&namespaceId=1
