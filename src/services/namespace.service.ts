'use srtict';

import { Accessory } from '../models/Accessory.model.js';
import { Color } from '../models/Color.model.js';
import { Phone } from '../models/Phone.model.js';
import { Tablet } from '../models/Tablet.model.js';
import { getIncludeOptions } from '../utils/helpers.js';

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

  async getPhoneByQueries(
    namespaceId: number,
    color: string,
    capacity: string
  ) {
    const currentColor = await Color.findOne({
      where: { title: color }
    });

    const includeOptions = getIncludeOptions(
      namespaceId,
      currentColor?.dataValues.id,
      capacity
    );

    const phone = await Phone.findOne({
      include: includeOptions
    });

    const phoneId = phone?.dataValues.id;

    return phoneId;
  }

  async getTabletByQueries(
    namespaceId: number,
    color: string,
    capacity: string
  ) {
    const currentColor = await Color.findOne({
      where: { title: color }
    });

    const includeOptions = getIncludeOptions(
      namespaceId,
      currentColor?.dataValues.id,
      capacity
    );

    const tablet = await Tablet.findOne({
      include: includeOptions
    });

    const tabletId = tablet?.dataValues.id;

    return tabletId;
  }

  async getAccessoryByQueries(
    namespaceId: number,
    color: string,
    capacity: string
  ) {
    const currentColor = await Color.findOne({
      where: { title: color }
    });

    const includeOptions = getIncludeOptions(
      namespaceId,
      currentColor?.dataValues.id,
      capacity
    );

    const accessory = await Accessory.findOne({
      include: includeOptions
    });

    const accessoryId = accessory?.dataValues.id;

    return accessoryId;
  }
}

export const namespaceService = NamespaceService.getInstance();
