'use strict';

import fs from 'fs/promises';
import path from 'path';
import { Phone } from '../types.js';

const filePath = path.resolve('data', 'phones.json');

async function read() {
  const data = await fs.readFile(filePath, 'utf8');

  return JSON.parse(data);
}

class PhoneService {
  private static instance: PhoneService | null = null;

  // eslint-disable-next-line no-empty-function
  private constructor() {}

  static getInstance(): PhoneService {
    if (!PhoneService.instance) {
      PhoneService.instance = new PhoneService();
    }

    return PhoneService.instance;
  }

  async getAll() {
    const result = await read();

    return result;
  }

  async getById(phoneId: string) {
    const result = await read();

    const foundPhone = result.find((phone: Phone) => phone.id === phoneId);

    return foundPhone || null;
  }
}

export const phoneService = PhoneService.getInstance();
