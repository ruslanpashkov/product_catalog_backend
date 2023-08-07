'use strict';

import { Accessory } from '../models/Accessory.model.js';
import { Category } from '../models/Category.model.js';
import { Phone } from '../models/Phone.model.js';
import { Tablet } from '../models/Tablet.model.js';

export const commonProductsIncludeOptions = [
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
];

export const commonProductsAttributesOptions = {
  exclude: ['createdAt', 'colorId', 'categoryId']
};
