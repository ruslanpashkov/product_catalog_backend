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

  getProducts: Controller = async (req, res) => {
    const products = await productService.getAll();

    if (!products) {
      res.status(404).json({ message: 'Products not found' });

      return;
    }

    const formattedProducts = formatMultipleProducts(products);

    res.status(200).json(formattedProducts);
  };

  getProductsByDiscount: Controller = async (req, res) => {
    const discountProducts = await productService.getAll();

    if (!discountProducts) {
      res.status(404).json({ message: 'No discounted products found' });

      return;
    }

    discountProducts.sort((productA, productB) => {
      const { fullPrice: fullPriceA, price: priceA } = productA.toJSON();
      const { fullPrice: fullPriceB, price: priceB } = productB.toJSON();

      const discountA = (100 / fullPriceA) * priceA;
      const discountB = (100 / fullPriceB) * priceB;

      return discountA - discountB;
    });

    const highestDiscountProducts = discountProducts.slice(0, 10);

    const formattedProducts = formatMultipleProducts(highestDiscountProducts );

    res.status(200).json(formattedProducts);
  };

  getProducntsByNew: Controller = async (req, res) => {
    const newProducts = await productService.getAll();

    if (!newProducts) {
      res.status(404).json({ message: 'No new products found' });

      return;
    }

    newProducts.sort((productA, productB) => {
      return productB.toJSON().year - productA.toJSON().year;
    });

    const latestProducts = newProducts.slice(0, 10);

    const formattedProducts = formatMultipleProducts(latestProducts);

    res.status(200).json(formattedProducts);
  };
}

export const productController = ProductController.getInstance();
