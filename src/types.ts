import { Request, Response } from 'express';
import { Category } from './models/Category.model';
import { Color } from './models/Color.model';

export type Controller = (req: Request, res: Response) => void;

interface ItemProduct {
  id: number,
  name: string;
  fullPrice: number;
  price: number;
  ram: string;
  screen: string;
  capacity: string;
  color: Color,
  category: Category;
}

export interface ItemJSON {
  id: number;
  resolution: string;
  processor: string;
  camera: string;
  zoom: string;
  cell: string;
  namespaceId: number;
  product: ItemProduct;
}
