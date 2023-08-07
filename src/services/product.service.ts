'use strict';

// import { FindOptions, Includeable, Order } from 'sequelize';
import { FindOptions } from 'sequelize';
import { Accessory } from '../models/Accessory.model.js';
import { Category } from '../models/Category.model.js';
import { Phone } from '../models/Phone.model.js';
import { Product } from '../models/Product.model.js';
import { Tablet } from '../models/Tablet.model.js';

// interface QueryOptions {
//   include: Includeable | Includeable[],
//   attributes: {
//     exclude: string[],
//   },
//   limit?: number | null,
//   order?: Order | undefined,
// }

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

  // async getAll() {
  //   return Product.findAll({
  //     include: [
  //       {
  //         model: Phone,
  //         as: 'itemPhone',
  //         attributes: ['id']
  //       },
  //       {
  //         model: Tablet,
  //         as: 'itemTablet',
  //         attributes: ['id']
  //       },
  //       {
  //         model: Accessory,
  //         as: 'itemAccessory',
  //         attributes: ['id']
  //       },
  //       {
  //         model: Category,
  //         as: 'category',
  //         attributes: ['title']
  //       },
  //     ],
  //     attributes: { exclude: ['createdAt', 'colorId', 'categoryId'] }
  //   });
  // }

  async getAll(
    limit: number | null = null,
    order: [string, string][] | null = null,
    // order: [string, string][] | null = null,
  ) {
    const queryOptions: FindOptions = {
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
          model: Accessory,
          as: 'itemAccessory',
          attributes: ['id']
        },
        {
          model: Category,
          as: 'category',
          attributes: ['title']
        },
      ],
      attributes: { exclude: ['createdAt', 'colorId', 'categoryId'] },
    };

    if (limit !== null) {
      queryOptions.limit = limit;
    }

    if (order !== null) {
      queryOptions.order = order;
    }

    return Product.findAll(queryOptions);
  }
}

export const productService = ProductService.getInstance();
