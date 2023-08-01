'use strict';

import { Product } from '../models/Product.model.js';

class ProductService {
  private static instance: ProductService | null = null;

  // eslint-disable-next-line no-empty-function
  private constructor() {}

  static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }

    return ProductService.instance;
  }

  async getAll() {
    return Product.findAll();
  }

  async getById(productId: number) {
    return Product.findByPk(productId);
  }
}

export const productService = ProductService.getInstance();
