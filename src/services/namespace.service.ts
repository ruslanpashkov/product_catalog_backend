'use srtict';

import { Color } from '../models/Color.model.js';
import { Detail } from '../models/Detail.model.js';
import { Namespace } from '../models/Namespace.model.js';
import { Product } from '../models/Product.model.js';

class NamespaceService {
  private static instance: NamespaceService | null = null;

  // eslint-disable-next-line no-empty-function
  private constructor() {}

  static getInstance() {
    if (!NamespaceService.instance) {
      NamespaceService.instance = new NamespaceService();
    }

    return NamespaceService.instance;
  }

  async getDeviceByQueries(
    namespaceId: number,
    color: string,
    capacity: string
  ) {
    const currentColor = await Color.findOne({
      where: { title: color }
    });

    const colorId = currentColor?.dataValues.id;

    const phone = await Detail.findOne({
      include: [
        {
          model: Namespace,
          where: { id: namespaceId },
        },
        {
          model: Product,
          where: { colorId, capacity },
        },
      ]
    });

    const deviceId = phone?.dataValues.id;

    return deviceId;
  }
}

export const namespaceService = NamespaceService.getInstance();
