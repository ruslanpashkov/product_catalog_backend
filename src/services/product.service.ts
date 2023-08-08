'use strict';

import { Sequelize } from 'sequelize-typescript';
import { Category } from '../models/Category.model.js';
import { Product } from '../models/Product.model.js';
import { commonProductsAttributesOptions, commonProductsIncludeOptions } from '../utils/constants.js';
import { Op } from 'sequelize';

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

  async getCountProducts(category: string) {
    const currentCategory = await Category.findOne({
      where: { title: category },
    });

    return Product.count({
      where: { categoryId: currentCategory?.id },
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

  async getRecommended(
    price: number,
    fullPrice: number,
    categoryId: number,
    priceLimit: number,
    limit: number,
  ) {
    const byPricePromise = Product.findAll({
      include: commonProductsIncludeOptions,
      attributes: commonProductsAttributesOptions,
      where: {
        price: {
          [Op.between]: [price - priceLimit, price + priceLimit]
        }
      },
      order: Sequelize.literal('RANDOM()'),
      limit,
    });

    const byFullPricePromise = Product.findAll({
      include: commonProductsIncludeOptions,
      attributes: commonProductsAttributesOptions,
      where: {
        price: {
          [Op.between]: [fullPrice - priceLimit, fullPrice + priceLimit]
        }
      },
      order: Sequelize.literal('RANDOM()'),
      limit,
    });

    const byCategoryPromise = Product.findAll({
      include: commonProductsIncludeOptions,
      attributes: commonProductsAttributesOptions,
      where: {
        categoryId
      },
      order: Sequelize.literal('RANDOM()'),
      limit,
    });

    const [
      recommendedByPrice,
      recommendedByFullPrice,
      recommendedByCategory
    ] = await Promise.all([
      byPricePromise,
      byFullPricePromise,
      byCategoryPromise
    ]);

    return { recommendedByPrice, recommendedByFullPrice, recommendedByCategory };
  }
}

export const productService = ProductService.getInstance();
