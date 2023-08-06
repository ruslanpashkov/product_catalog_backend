'use strict';

import { Request } from 'express';
import { ImagesColor } from '../models/ImagesColor.model.js';
import { Capacity } from '../models/Capacity.model.js';
import { Description } from '../models/Description.model.js';

export const getPaginationInfo = (req: Request) => {
  const { page, limit } = req.query;

  const initialPage = Number(page || 1);
  const initialLimit = Number(limit || 16);

  const offset = initialLimit * initialPage - initialLimit;

  return { initialLimit, offset };
};

interface ItemJSON {
  id: number;
  resolution: string;
  processor: string;
  camera: string;
  zoom: string;
  cell: string;
  namespaceId: number;
  product: {
    name: string;
    fullPrice: number;
    price: number;
    ram: string;
    screen: string;
    capacity: string;
    colorId: number;
  }
}

export const formatProduct = (
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
