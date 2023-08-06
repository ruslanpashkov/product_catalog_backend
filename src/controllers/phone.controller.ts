'use strict';

import { phoneService } from '../services/phone.service.js';
import { Controller } from '../types.js';
import { formatSingleProduct, getPaginationInfo } from '../utils/helpers.js';

class PhoneController {
  private static instance: PhoneController | null = null;

  // eslint-disable-next-line no-empty-function
  private constructor() {}

  static getInstance() {
    if (!PhoneController.instance) {
      PhoneController.instance = new PhoneController();
    }

    return PhoneController.instance;
  }

  getPhones: Controller = async (req, res) => {
    const { initialLimit, offset } = getPaginationInfo(req);

    const { sortOption } = req.query || 'Newest';
    // const sortOption = req.query.sortBy || 'Newest';

    const phones = await phoneService.getAll(offset, initialLimit, sortOption);

    if (!phones) {
      res.status(404).json({ message: 'Phones not found' });
    }

    const formattedPhones = phones.rows.map(phone => {
      const {
        itemPhone,
        ...rest
      } = phone.toJSON();

      let itemId = '';

      if (itemPhone) {
        itemId = itemPhone.id;
      }

      const result = {
        ...rest,
        itemId,
      };

      return result;
    });

    res.status(200).json({ count: phones.count, rows: formattedPhones });
  };

  getPhoneById: Controller = async (req, res) => {

    const { phoneId } = req.params;
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
  };
}

export const phoneController = PhoneController.getInstance();
