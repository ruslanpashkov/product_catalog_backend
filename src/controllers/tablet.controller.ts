'use strict';

import { tabletService } from '../services/tablet.service.js';
import { Controller } from '../types.js';

class TabletController {
  private static instance: TabletController | null = null;

  // eslint-disable-next-line no-empty-function
  private constructor() {}

  static getInstance() {
    if (!TabletController.instance) {
      TabletController.instance = new TabletController();
    }

    return TabletController.instance;
  }

  getTablets: Controller = async (req, res) => {
    const { page, limit } = req.query;
    const initialPage = +(page || 1);
    const initialLimit = +(limit || 9);

    const offset = initialLimit * initialPage - initialLimit;

    const tablets = await tabletService.getAll(offset, initialLimit);

    if (!tablets) {
      res.status(404).json({ message: 'Tablets not found' });
    }

    const formattedTablets = tablets.rows.map(tablet => {
      const {
        itemTablet,
        screen: Screen,
        capacity: Capacity,
        ram: RAM,
        ...rest
      } = tablet.toJSON();

      let itemId = '';

      if (itemTablet) {
        itemId = itemTablet.id;
      }

      const result = {
        ...rest,
        Screen,
        Capacity,
        RAM,
        itemId,
      };

      return result;
    });

    res.status(200).json(formattedTablets);
  };

  getTabletById: Controller = async (req, res) => {
    const { tabletId } = req.params;
    const tabletData = await tabletService.getTabletById(tabletId);

    if (!tabletData) {
      res.status(404).json({ message: 'Tablet not found' });

      return;
    }

    const {
      tablet,
      imagesColor,
      capacities,
      descriptions,
      colors
    } = tabletData;

    const tabletJSON = tablet?.toJSON();

    const images = imagesColor.map(imageColor => (
      imageColor.toJSON().imagePath
    ));

    const capacityAvailable = capacities.map(capacitySize => (
      capacitySize.toJSON().capacity
    ));

    const colorsAvailable = colors.map(colorData => (
      colorData.toJSON().color.title
    ));

    const formattedTablet = {
      id: tabletJSON.id,
      Resolution: tabletJSON.resolution,
      Processor: tabletJSON.processor,
      Camera: tabletJSON.camera,
      Zoom: tabletJSON.zoom,
      Cell: tabletJSON.cell,
      namespaceId: tabletJSON.namespaceId,
      productId: tabletJSON.productId,
      name: tabletJSON.product.name,
      fullPrice: tabletJSON.product.fullPrice,
      price: tabletJSON.product.price,
      RAM: tabletJSON.product.ram,
      Screen: tabletJSON.product.screen,
      Capacity: tabletJSON.product.capacity,
      colorId: tabletJSON.product.colorId,
      images,
      capacityAvailable,
      descriptions,
      colorsAvailable
    };

    res.status(200).json(formattedTablet);
  };
}

export const tabletController = TabletController.getInstance();
