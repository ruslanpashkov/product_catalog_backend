'use strict';

import { Product } from '../models/Product.model.js';
import { productService } from '../services/product.service.js';
import { Controller } from '../types.js';
import { formatMultipleProducts, getUniqueItems } from '../utils/helpers.js';

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

  getCountProducts: Controller = async (req, res) => {
    const { category } = req.query;

    if (!category) {
      res.status(400).json(
        { message: 'Missing required category parameter' }
      );

      return;
    }

    const normalizeCategory = String(category);

    const count = await productService.getCountProducts(normalizeCategory);

    if (!count) {
      res.status(404).json({ message: 'Count not found' });

      return;
    }

    res.status(200).json(count);
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

  getRecommendedProducts: Controller = async (req, res) => {
    const { price, fullPrice, categoryId } = req.query;

    if (!price) {
      res.status(400).json(
        { message: 'Missing required price parameter' }
      );

      return;
    }

    if (!fullPrice) {
      res.status(400).json(
        { message: 'Missing required fullPrice parameter' }
      );

      return;
    }

    if (!categoryId) {
      res.status(400).json(
        { message: 'Missing required categoryId parameter' }
      );

      return;
    }

    const normalizePrice = Number(price);
    const normalizeFullPrice = Number(fullPrice);
    const normalizeCategoryId = Number(categoryId);
    const priceLimit = 200;
    const limit = 4;

    const recomendedProducts = await productService.getRecommended(
      normalizePrice,
      normalizeFullPrice,
      normalizeCategoryId,
      priceLimit,
      limit,
    );

    if (!recomendedProducts) {
      res.status(404).json({ message: 'Products not found' });

      return;
    }

    const allRecommendedProducts = [
      ...recomendedProducts.recommendedByPrice,
      ...recomendedProducts.recommendedByFullPrice,
      ...recomendedProducts.recommendedByCategory,
    ];

    const formattedProducts = formatMultipleProducts(allRecommendedProducts);
    const uniquesProducts = getUniqueItems<Product>(formattedProducts, 'id');

    res.status(200).json(uniquesProducts);
  };
}

export const productController = ProductController.getInstance();
