'use strict';

import { accessoryService } from '../services/accessory.service.js';
import { Controller } from '../types.js';
import { formatSingleProduct, getPaginationInfo } from '../utils/helpers.js';

class AccessoryController {
  private static instance: AccessoryController | null = null;

  // eslint-disable-next-line no-empty-function
  private constructor() {}

  static getInstance() {
    if (!AccessoryController.instance) {
      AccessoryController.instance = new AccessoryController();
    }

    return AccessoryController.instance;
  }

  getAccessories: Controller = async (req, res) => {
    const { initialLimit, offset } = getPaginationInfo(req);

    const { sortBy } = req.query as { sortBy?: string } || { sortBy: 'Newest' };

    const accessories = await accessoryService.getAll(offset, initialLimit, sortBy);

    if (!accessories) {
      res.status(404).json({ message: 'Accessories not found' });
    }

    const formattedAccessory = accessories.rows.map(accessory => {
      const {
        itemAccessory,
        ...rest
      } = accessory.toJSON();

      let itemId = '';

      if (itemAccessory) {
        itemId = itemAccessory.id;
      }

      const result = {
        ...rest,
        itemId,
      };

      return result;
    });

    res.status(200).json({ count: accessories.count, data: formattedAccessory });
  };

  getAccessoryById: Controller = async (req, res) => {
    const { accessoryId } = req.params;
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

    const accessoryJSON = accessory?.toJSON();

    const formattedAccessory = formatSingleProduct(
      accessoryJSON,
      imagesColor,
      capacities,
      descriptions,
      colors
    );

    res.status(200).json(formattedAccessory);
  };
}

export const accessoryController = AccessoryController.getInstance();
