'use strict';

import { productService } from '../services/product.service.js';
import { Controller } from '../types.js';

class ProductController {
  private static instance: ProductController | null = null;

  // eslint-disable-next-line no-empty-function
  private constructor() {}

  static getInstance() {
    if (!ProductController.instance) {
      ProductController.instance = new ProductController();
    }

    return ProductController.instance;
  }

  getProduct: Controller = async (req, res) => {
    const products = await productService.getAll();

    res.status(200).json(products);
  };

  getProductById: Controller = async (req, res) => {
    const { productId } = req.params;
    const product = await productService.getById(Number(productId));

    if (!product) {
      res.status(404).json({ error: 'Phone not found' });

      return;
    }

    res.status(200).json(product);
  };
}

export const productController = ProductController.getInstance();