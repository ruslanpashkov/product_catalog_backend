'use strict';

import { Category } from '../models/Category.model.js';
import { Phone } from '../models/Phone.model.js';
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
    return Product.findAll({
      attributes: {
        exclude: ['createdAt', 'categoryId', 'colorId']
      }
    });
  }

  async getById(productId: number) {
    return Product.findByPk(productId, {
      include: [
        {
          model: Phone,
          as: 'itemPhone',
          attributes: { exclude: ['createdAt', 'namespaceId', 'productId'] },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'categoryId', 'colorId'],
      },
    });
  }

  async getPhones() {
    const currentCategory = await Category.findOne({
      where: { title: 'phones' },
    });

    const phones = await Product.findAll({
      where: { categoryId: currentCategory?.id },
      attributes: {
        exclude: ['createdAt', 'categoryId', 'colorId'],
      }
    });

    return phones;
  }
}

export const productService = ProductService.getInstance();
