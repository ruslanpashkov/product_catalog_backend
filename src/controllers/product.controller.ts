'use strict';

import { productService } from '../services/product.service.js';
import { Controller } from '../types.js';
import { formatMultipleProducts } from '../utils/helpers.js';

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

  getAllProducts: Controller = async (req, res) => {
    const products = await productService.getAll();

    if (!products) {
      res.status(404).json({ message: 'Products not found' });

      return;
    }

    const formattedProducts = formatMultipleProducts(products);

    res.status(200).json(formattedProducts);
  };

  getProductsByDiscount: Controller = async (req, res) => {
    const countProductsPerCategory = 4;

    const discountProducts = await productService.getDiscountProductsPerCategory(countProductsPerCategory);

    if (!discountProducts) {
      res.status(404).json({ message: 'No discounted products found' });

      return;
    }

    const formattedProducts = formatMultipleProducts(discountProducts);

    res.status(200).json(formattedProducts);
  };

  getProductsByNew: Controller = async (req, res) => {
    const countProductsPerCategory = 12;

    const newProducts = await productService.getNewProducts(countProductsPerCategory);

    if (!newProducts) {
      res.status(404).json({ message: 'No new products found' });

      return;
    }

    const formattedProducts = formatMultipleProducts(newProducts);

    res.status(200).json(formattedProducts);
  };
}

export const productController = ProductController.getInstance();
