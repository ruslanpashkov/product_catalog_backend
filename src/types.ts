import { Request, Response } from 'express';

export type Controller = (req: Request, res: Response) => void;

interface ItemProduct {
  name: string;
  fullPrice: number;
  price: number;
  ram: string;
  screen: string;
  capacity: string;
  colorId: number;
}

export interface ItemJSON {
  id: number;
  resolution: string;
  processor: string;
  camera: string;
  zoom: string;
  cell: string;
  namespaceId: number;
  product: ItemProduct
}
