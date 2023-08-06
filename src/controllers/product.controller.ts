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

    // const formattedProducts = products.map(product => {
    //   const {
    //     itemPhone,
    //     itemTablet,
    //     itemAccessory,
    //     category,
    //     ...rest
    //   } = product.toJSON();

    //   const itemType = {
    //     itemId: '',
    //   };

    //   if (itemPhone) {
    //     itemType.itemId = itemPhone.id;
    //   }

    //   if (itemTablet) {
    //     itemType.itemId = itemTablet.id;
    //   }

    //   if (itemAccessory) {
    //     itemType.itemId = itemAccessory.id;
    //   }

    //   const result = {
    //     ...rest,
    //     category: category.title,
    //     ...itemType
    //   };
    //   return result;
    // });

    const formattedProducts = formatMultipleProducts(products);

    res.status(200).json(formattedProducts);
  };

  getProductsByDiscount: Controller =async (req, res) => {
    const discountProducts = await productService.getAll();

    if (!discountProducts) {
      res.status(404).json({ message: 'No discounted products found' });

      return;
    }

    discountProducts.sort((productA, productB) => {
      const { fullPrice: fullPriceA, price: priceA } = productA.toJSON();
      const { fullPrice: fullPriceB, price: priceB } = productB.toJSON();

      const discountA = ((fullPriceA - priceA) / fullPriceA) * 100;
      const discountB = ((fullPriceB - priceB) / fullPriceB) * 100;

      return discountA - discountB;
    });

    const topDiscountProducts = discountProducts.slice(0, 10);

    const formattedProducts = formatMultipleProducts(topDiscountProducts);

    res.status(200).json(formattedProducts);
  };
}

export const productController = ProductController.getInstance();
