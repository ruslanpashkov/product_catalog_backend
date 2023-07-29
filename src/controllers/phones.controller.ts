'use strict';

import { PhonesService } from '../services/phones.service.js';
import { Controller } from '../types.js';

export const getAllPhonesController: Controller = async (_, res) => {
  const phoneService = new PhonesService();

  const phones = await phoneService.getAll();

  res.send(phones);
};

export const getPhoneByIdController: Controller = async (req, res) => {
  const phoneService = new PhonesService();

  const { phoneId } = req.params;
  const foundPhone = await phoneService.getById(phoneId);

  if (!foundPhone) {
    res.status(404).json({ error: 'Phone not found' });

    return;
  }

  res.send(foundPhone);
};
