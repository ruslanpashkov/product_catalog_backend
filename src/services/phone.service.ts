'use strict';

import { Capacity } from '../models/Capacity.model.js';
import { Category } from '../models/Category.model.js';
import { Color } from '../models/Color.model.js';
import { Description } from '../models/Description.model.js';
import { ImagesColor } from '../models/ImagesColor.model.js';
import { NamespaceCapacity } from '../models/NamespaceCapacity.model.js';
import { Phone } from '../models/Phone.model.js';
import { Product } from '../models/Product.model.js';

class PhoneService {
  private static instance: PhoneService | null = null;

  // eslint-disable-next-line no-empty-function
  private constructor() {}

  static getInstance(): PhoneService {
    if (!PhoneService.instance) {
      PhoneService.instance = new PhoneService();
    }

    return PhoneService.instance;
  }

  async getAll(offset: number, limit: number) {
    const currentCategory = await Category.findOne({
      where: { title: 'phones' },
    });

    const phones = await Product.findAndCountAll({
      offset,
      limit,
      where: { categoryId: currentCategory?.id },
      include: [
        {
          model: Phone,
          as: 'itemPhone',
          attributes: ['id'],
        }
      ],
      attributes: {
        exclude: ['createdAt', 'categoryId', 'colorId', 'year'],
      }
    });

    return phones;
  }

  async getPhoneById(phoneId: string) {
    const phone = await Phone.findByPk(phoneId, {
      include: [
        {
          model: Product,
          as: 'product',
          attributes: { exclude: ['createdAt', 'id', 'year', 'image', 'categoryId'] }
        }
      ],
      attributes: { exclude: ['createdAt'] }
    });

    const { namespaceId, product } = phone?.dataValues || {};
    const { colorId } = product.dataValues;

    const imagesColor = await ImagesColor.findAll({
      where: {
        namespaceId,
        colorId,
      },
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
      where: {
        namespaceId,
      },
      group: ['colorId', 'color.id']
    });

    const capacities = await Capacity.findAll({
      include: [
        {
          model: NamespaceCapacity,
          as: 'namespaceCapacities',
          where: {
            namespaceId
          },
          attributes: []
        },
      ],
      attributes: ['capacity'],
    });

    const descriptions = await Description.findAll({
      where: {
        namespaceId
      },
      attributes: ['title', 'text']
    });

    return { phone, imagesColor, capacities, descriptions, colors };
  }
}

export const phoneService = PhoneService.getInstance();
