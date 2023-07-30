'use strict';

import { phoneService } from '../services/phone.service.js';
import { Controller } from '../types.js';

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
    const phones = await phoneService.getAll();

    res.status(200).json(phones);
  };

  getPhoneById: Controller = async (req, res) => {
    const { phoneId } = req.params;
    const foundPhone = await phoneService.getById(phoneId);

    if (!foundPhone) {
      res.status(404).json({ error: 'Phone not found' });

      return;
    }

    res.status(200).json(foundPhone);
  };
}

export const phoneController = PhoneController.getInstance();
