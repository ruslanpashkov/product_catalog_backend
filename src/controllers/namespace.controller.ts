'use strict';

import { accessoryService } from '../services/accessory.service.js';
import { namespaceService } from '../services/namespace.service.js';
import { phoneService } from '../services/phone.service.js';
import { tabletService } from '../services/tablet.service.js';
import { Controller } from '../types';
import { formatSingleProduct } from '../utils/helpers.js';

class NamespaceController {
  private static instance: NamespaceController | null = null;

  // eslint-disable-next-line no-empty-function
  private constructor() {}

  static getInstance() {
    if (!NamespaceController.instance) {
      NamespaceController.instance = new NamespaceController();
    }

    return NamespaceController.instance;
  }

  getProductId: Controller = async (req, res) => {
    const { category, namespaceId, color, capacity } = req.query;
    //! namespaces? category=phones & namespaceId=1 & color=red & capacity=512GB

    if (!category) {
      res.status(400).json(
        { message: 'Missing required category parameter' }
      );

      return;
    }

    if (!color) {
      res.status(400).json(
        { message: 'Missing required color parameter' }
      );

      return;
    }

    if (!capacity) {
      res.status(400).json(
        { message: 'Missing required capacity parameter' }
      );

      return;
    }

    if (!namespaceId) {
      res.status(400).json(
        { message: 'Missing required namespaceId parameter' }
      );

      return;
    }

    const normalizeCategory = String(category);
    const normalizeNamespaceId = Number(namespaceId);
    const normalizeColor = String(color).toLowerCase();
    const normalizeCapacity = String(capacity).toUpperCase();

    //! that part will change next time (it will be refactor)

    const validCategories = ['phones', 'tablets', 'accessories'];

    if (!validCategories.includes(normalizeCategory)) {
      res.status(400).json(
        { message: 'Invalid category parameter' }
      );

      return;
    }

    if (normalizeCategory === 'phones') {
      const phoneId = await namespaceService.getPhoneByQueries(
        normalizeNamespaceId,
        normalizeColor,
        normalizeCapacity
      );

      if (!phoneId) {
        res.status(404).json({ message: 'PhoneId not found' });

        return;
      }

      const phoneData = await phoneService.getPhoneById(phoneId);

      if (!phoneData) {
        res.status(404).json({ message: 'Phone not found' });

        return;
      }

      const {
        phone,
        imagesColor,
        capacities,
        descriptions,
        colors
      } = phoneData;

      const phoneJSON = phone?.toJSON();

      const formattedPhone = formatSingleProduct(
        phoneJSON,
        imagesColor,
        capacities,
        descriptions,
        colors
      );

      res.status(200).json(formattedPhone);
    }

    if (normalizeCategory === 'tablets') {
      const tabletId = await namespaceService.getTabletByQueries(
        normalizeNamespaceId,
        normalizeColor,
        normalizeCapacity
      );

      if (!tabletId) {
        res.status(404).json({ message: 'TabletId not found' });

        return;
      }

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

      const phoneJSON = tablet?.toJSON();

      const formattedTablet = formatSingleProduct(
        phoneJSON,
        imagesColor,
        capacities,
        descriptions,
        colors
      );

      res.status(200).json(formattedTablet);
    }

    if (normalizeCategory === 'accessories') {
      const accessoryId = await namespaceService.getAccessoryByQueries(
        normalizeNamespaceId,
        normalizeColor,
        normalizeCapacity
      );

      if (!accessoryId) {
        res.status(404).json({ message: 'AccesoryId not found' });

        return;
      }

      const accessoryData = await accessoryService.getAccessoryById(accessoryId);

      if (!accessoryData) {
        res.status(404).json({ message: 'Accessory not found' });

        return;
      }

      const {
        accessory,
        imagesColor,
        capacities,
        descriptions,
        colors
      } = accessoryData;

      const phoneJSON = accessory?.toJSON();

      const formattedAccessory = formatSingleProduct(
        phoneJSON,
        imagesColor,
        capacities,
        descriptions,
        colors
      );

      res.status(200).json(formattedAccessory);
    }
  };
}

export const namespaceController = NamespaceController.getInstance();
