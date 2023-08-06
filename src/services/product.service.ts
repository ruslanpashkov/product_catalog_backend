'use strict';

import { Category } from '../models/Category.model.js';
import { Phone } from '../models/Phone.model.js';
import { Product } from '../models/Product.model.js';
import { Tablet } from '../models/Tablet.model.js';

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
    return Product.findAll({
      include: [
        {
          model: Phone,
          as: 'itemPhone',
          attributes: ['id']
        },
        {
          model: Tablet,
          as: 'itemTablet',
          attributes: ['id']
        },
        {
          model: Category,
          as: 'category',
          attributes: ['title']
        },
      ],
      attributes: { exclude: ['createdAt', 'year', 'colorId', 'categoryId'] }
    });
  }

}

export const productService = ProductService.getInstance();
