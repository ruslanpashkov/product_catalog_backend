'use strict';

import { productService } from '../services/product.service.js';
import { Controller } from '../types.js';

class ProductController {
  private static instance: ProductController | null = null;

  // eslint-disable-next-line no-empty-function
  private constructor() {}

  static getInstance() {
    if (!ProductController.instance) {
      ProductController.instance = new ProductController();
    }

    return ProductController.instance;
  }

  getProducts: Controller = async (req, res) => {
    const products = await productService.getAll();

    if (!products) {
      res.status(404).json({ message: 'Products not found' });

      return;
    }

    const formattedProducts = products.map(product => {
      const {
        itemPhone,
        itemTablet,
        itemAccessory,
        category,
        ram: RAM,
        capacity,
        screen,
        ...rest
      } = product.toJSON();

      const itemType = {
        itemId: '',
      };

      if (itemPhone) {
        itemType.itemId = itemPhone.id;
      }

      if (itemTablet) {
        itemType.itemId = itemTablet.id;
      }

      if (itemAccessory) {
        itemType.itemId = itemAccessory.id;
      }

      const result = {
        ...rest,
        category: category.title,
        Capacity: capacity,
        Screen: screen,
        RAM,
        ...itemType
      };
      return result;
    });

    res.status(200).json(formattedProducts);
  };

}

export const productController = ProductController.getInstance();
