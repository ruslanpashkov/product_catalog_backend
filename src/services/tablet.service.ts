'use strict';

import { Capacity } from '../models/Capacity.model.js';
import { Category } from '../models/Category.model.js';
import { Color } from '../models/Color.model.js';
import { Description } from '../models/Description.model.js';
import { ImagesColor } from '../models/ImagesColor.model.js';
import { NamespaceCapacity } from '../models/NamespaceCapacity.model.js';
import { Product } from '../models/Product.model.js';
import { Tablet } from '../models/Tablet.model.js';
import { generateSortingOrder } from '../utils/helpers.js';

class TabletService {
  private static instance: TabletService | null = null;

  // eslint-disable-next-line no-empty-function
  private constructor() {}

  static getInstance(): TabletService {
    if (!TabletService.instance) {
      TabletService.instance = new TabletService();
    }

    return TabletService.instance;
  }

  async getAll(
    offset: number,
    limit: number,
    sortBy: string | undefined,
  ) {
    const currentCategory = await Category.findOne({
      where: { title: 'tablets' },
    });

    const sortingOrder = generateSortingOrder(sortBy);

    const tablets = await Product.findAndCountAll({
      offset,
      limit,
      where: { categoryId: currentCategory?.id },
      include: [
        {
          model: Tablet,
          as: 'itemTablet',
          attributes: ['id'],
        },
        {
          model: Category,
          as: 'category',
          attributes: ['title']
        },
      ],
      order: sortingOrder,
      attributes: {
        exclude: ['createdAt', 'categoryId', 'colorId', 'year'],
      }
    });

    return tablets;
  }

  async getTabletById(tabletId: string) {
    const tablet = await Tablet.findByPk(tabletId, {
      include: [
        {
          model: Product,
          as: 'product',
          attributes: { exclude: ['createdAt', 'id', 'year', 'image', 'categoryId'] }
        }
      ],
      attributes: { exclude: ['createdAt'] }
    });

    const { namespaceId, product } = tablet?.dataValues || {};
    const { colorId } = product.dataValues;

    const imagesColorPromise = ImagesColor.findAll({
      where: { namespaceId, colorId },
      attributes: ['imagePath']
    });

    const colorsPromise = ImagesColor.findAll({
      attributes: [
        'colorId'
      ],
      include: [
        {
          model: Color,
          as: 'color',
        }
      ],
      where: { namespaceId },
      group: ['colorId', 'color.id']
    });

    const capacitiesPromise = Capacity.findAll({
      include: [
        {
          model: NamespaceCapacity,
          as: 'namespaceCapacities',
          where: { namespaceId },
          attributes: []
        },
      ],
      attributes: ['capacity'],
    });

    const descriptionsPromise = Description.findAll({
      where: { namespaceId },
      attributes: ['title', 'text']
    });

    const [imagesColor, colors, capacities, descriptions] = await Promise.all([
      imagesColorPromise,
      colorsPromise,
      capacitiesPromise,
      descriptionsPromise
    ]);

    return { tablet, imagesColor, capacities, descriptions, colors };
  }
}

export const tabletService = TabletService.getInstance();
