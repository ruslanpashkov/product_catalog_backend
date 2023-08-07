'use strict';

import { Accessory } from '../models/Accessory.model.js';
import { Capacity } from '../models/Capacity.model.js';
import { Category } from '../models/Category.model.js';
import { Color } from '../models/Color.model.js';
import { Description } from '../models/Description.model.js';
import { ImagesColor } from '../models/ImagesColor.model.js';
import { NamespaceCapacity } from '../models/NamespaceCapacity.model.js';
import { Product } from '../models/Product.model.js';
import { generateSortingOrder } from '../utils/helpers.js';

class AccessoryService {
  private static instance: AccessoryService | null = null;

  // eslint-disable-next-line no-empty-function
  private constructor() {}

  static getInstance(): AccessoryService {
    if (!AccessoryService.instance) {
      AccessoryService.instance = new AccessoryService();
    }

    return AccessoryService.instance;
  }

  async getAll(
    offset: number,
    limit: number,
    sortBy: string | undefined,
  ) {
    const currentCategory = await Category.findOne({
      where: { title: 'accessories' },
    });

    const sortingOrder = generateSortingOrder(sortBy);

    const accessories = await Product.findAndCountAll({
      offset,
      limit,
      where: { categoryId: currentCategory?.id },
      include: [
        {
          model: Accessory,
          as: 'itemAccessory',
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

    return accessories;
  }

  async getAccessoryById(accessoryId: string) {
    const accessory = await Accessory.findByPk(accessoryId, {
      include: [
        {
          model: Product,
          as: 'product',
          attributes: { exclude: ['createdAt', 'year', 'image'] }
        }
      ],
      attributes: { exclude: ['createdAt'] }
    });

    const { namespaceId, product } = accessory?.dataValues || {};
    const { colorId } = product.dataValues;

    const imagesColor = await ImagesColor.findAll({
      where: { namespaceId, colorId },
      attributes: ['imagePath']
    });

    const colors = await ImagesColor.findAll({
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

    const capacities = await Capacity.findAll({
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

    const descriptions = await Description.findAll({
      where: { namespaceId },
      attributes: ['title', 'text']
    });

    return { accessory, imagesColor, capacities, descriptions, colors };
  }
}

export const accessoryService = AccessoryService.getInstance();
