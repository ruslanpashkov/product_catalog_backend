'use strict';

import { Request } from 'express';
import { ImagesColor } from '../models/ImagesColor.model.js';
import { Capacity } from '../models/Capacity.model.js';
import { Description } from '../models/Description.model.js';
import { Product } from '../models/Product.model.js';

export const getPaginationInfo = (req: Request) => {
  const { page, limit } = req.query;

  const initialPage = Number(page || 1);
  const initialLimit = Number(limit || 16);

  const offset = (initialLimit * initialPage) - initialLimit;

  return { initialLimit, offset };
};

interface ItemProduct {
  name: string;
  fullPrice: number;
  price: number;
  ram: string;
  screen: string;
  capacity: string;
  colorId: number;
}

interface ItemJSON {
  id: number;
  resolution: string;
  processor: string;
  camera: string;
  zoom: string;
  cell: string;
  namespaceId: number;
  product: ItemProduct
}

export const formatSingleProduct = (
  itemJSON: ItemJSON,
  imagesColor: ImagesColor[],
  capacities: Capacity[],
  descriptions: Description[],
  colors: ImagesColor[],
) => {
  const images = imagesColor.map(imageColor => (
    imageColor.toJSON().imagePath
  ));

  const capacityAvailable = capacities.map(capacitySize => (
    capacitySize.toJSON().capacity
  ));

  const colorsAvailable = colors.map(colorData => (
    colorData.toJSON().color.title
  ));

  return {
    id: itemJSON.id,
    resolution: itemJSON.resolution,
    processor: itemJSON.processor,
    camera: itemJSON.camera,
    zoom: itemJSON.zoom,
    cell: itemJSON.cell,
    namespaceId: itemJSON.namespaceId,
    name: itemJSON.product.name,
    fullPrice: itemJSON.product.fullPrice,
    price: itemJSON.product.price,
    ram: itemJSON.product.ram,
    screen: itemJSON.product.screen,
    capacity: itemJSON.product.capacity,
    colorId: itemJSON.product.colorId,
    images,
    capacityAvailable,
    descriptions,
    colorsAvailable
  };
};

export const formatMultipleProducts = (products: Product[]) => {
  return products.map(product => {
    const {
      itemPhone,
      itemTablet,
      itemAccessory,
      category,
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
      ...itemType
    };
    return result;
  });
};
