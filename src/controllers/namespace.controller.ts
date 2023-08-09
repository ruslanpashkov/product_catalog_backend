'use strict';

import { namespaceService } from '../services/namespace.service.js';
import { productService } from '../services/product.service.js';
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
    const { namespaceId, color, capacity } = req.query;

    if (!color) {
      res.status(404).json(
        { message: 'Missing required color parameter' }
      );

      return;
    }

    if (!capacity) {
      res.status(404).json(
        { message: 'Missing required capacity parameter' }
      );

      return;
    }

    if (!namespaceId) {
      res.status(404).json(
        { message: 'Missing required namespaceId parameter' }
      );

      return;
    }

    // const normalizeCategory = String(category);
    const normalizeNamespaceId = Number(namespaceId);
    const normalizeColor = String(color).toLowerCase();
    const normalizeCapacity = String(capacity).toUpperCase();

    const deviceId = await namespaceService.getDeviceByQueries(
      normalizeNamespaceId,
      normalizeColor,
      normalizeCapacity
    );

    if (!deviceId) {
      res.status(404).json({ message: 'DeviceId not found' });

      return;
    }

    const deviceData = await productService.getByDeviceId(deviceId);

    if (!deviceData) {
      res.status(404).json(
        { message: 'Device not found' }
      );

      return;
    }

    const formattedPhone = formatSingleProduct(deviceData);

    res.status(200).json(formattedPhone);
  };
}

export const namespaceController = NamespaceController.getInstance();
