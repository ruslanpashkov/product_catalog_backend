'use strict';

import fs from 'fs/promises';
import path from 'path';
import { Phone } from '../types.js';

const filePath = path.resolve('data', 'phones.json');

async function read() {
  const data = await fs.readFile(filePath, 'utf8');

  return JSON.parse(data);
}

export class PhonesService {
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
