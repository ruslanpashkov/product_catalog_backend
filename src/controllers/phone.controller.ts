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
    const { page, limit } = req.query;
    const initialPage = +(page || 1);
    const initialLimit = +(limit || 9);

    const offset = initialLimit * initialPage - initialLimit;

    const phones = await phoneService.getAll(offset, initialLimit);

    if (!phones) {
      res.status(404).json({ message: 'Phones not found' });
    }

    const formattedPhones = phones.rows.map(phone => {
      const {
        itemPhone,
        screen: Screen,
        capacity: Capacity,
        ram: RAM,
        ...rest
      } = phone.toJSON();

      let itemId = '';

      if (itemPhone) {
        itemId = itemPhone.id;
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

    res.status(200).json(formattedPhones);
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

    const images = imagesColor.map(imageColor => (
      imageColor.toJSON().imagePath
    ));

    const capacityAvailable = capacities.map(capacitySize => (
      capacitySize.toJSON().capacity
    ));

    const colorsAvailable = colors.map(colorData => (
      colorData.toJSON().color.title
    ));

    const formattedPhone = {
      RAM: phoneJSON.ram,
      id: phoneJSON.id,
      Resolution: phoneJSON.resolution,
      Processor: phoneJSON.processor,
      Camera: phoneJSON.camera,
      Zoom: phoneJSON.zoom,
      Cell: phoneJSON.cell,
      namespaceId: phoneJSON.namespaceId,
      productId: phoneJSON.productId,
      name: phoneJSON.product.name,
      fullPrice: phoneJSON.product.fullPrice,
      price: phoneJSON.product.price,
      Screen: phoneJSON.product.screen,
      Capacity: phoneJSON.product.capacity,
      colorId: phoneJSON.product.colorId,
      images,
      capacityAvailable,
      descriptions,
      colorsAvailable
    };

    res.status(200).json(formattedPhone);
  };
}

export const phoneController = PhoneController.getInstance();
