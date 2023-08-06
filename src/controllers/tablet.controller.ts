'use strict';

import { tabletService } from '../services/tablet.service.js';
import { Controller } from '../types.js';
import { formatSingleProduct, getPaginationInfo } from '../utils/helpers.js';

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
    const { initialLimit, offset } = getPaginationInfo(req);

    const tablets = await tabletService.getAll(offset, initialLimit);

    if (!tablets) {
      res.status(404).json({ message: 'Tablets not found' });
    }

    const formattedTablets = tablets.rows.map(tablet => {
      const {
        itemTablet,
        ...rest
      } = tablet.toJSON();

      let itemId = '';

      if (itemTablet) {
        itemId = itemTablet.id;
      }

      const result = {
        ...rest,
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

    const formattedTablet = formatSingleProduct(
      tabletJSON,
      imagesColor,
      capacities,
      descriptions,
      colors
    );

    res.status(200).json(formattedTablet);
  };
}

export const tabletController = TabletController.getInstance();
