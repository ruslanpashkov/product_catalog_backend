'use strict';

import { Sequelize } from 'sequelize-typescript';
import { Category } from '../models/Category.model.js';
import { Product } from '../models/Product.model.js';
import { commonProductsAttributesOptions, commonProductsIncludeOptions } from '../utils/constants.js';

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
      include: commonProductsIncludeOptions,
      attributes: commonProductsAttributesOptions
    });
  }

  async getDiscountProductsPerCategory(countPerCategory: number) {
    const categories = await Category.findAll({
      attributes: ['id'],
    });

    const productsPerCategoryPromises = categories.map(async (category) => {
      const products = await Product.findAll({
        where: { categoryId: category.id },
        limit: countPerCategory,
        include: commonProductsIncludeOptions,
        attributes: commonProductsAttributesOptions,
        order: [
          [
            Sequelize.literal('100 * ("fullPrice" - "price") / "fullPrice"'),
            'DESC'
          ],
        ],
      });

      return products;
    });

    const productsPerCategory = await Promise.all(productsPerCategoryPromises);

    const products = productsPerCategory.flat();

    return products;
  }

  async getNewProducts(count: number) {
    const newProducts = await Product.findAll({
      include: commonProductsIncludeOptions,
      attributes: commonProductsAttributesOptions,
      order: [['year', 'DESC']],
      limit: count,
    });

    return newProducts;
  }
}

export const productService = ProductService.getInstance();
