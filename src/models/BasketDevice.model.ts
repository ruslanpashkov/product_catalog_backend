'use strict';

import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Basket } from './Basket.model.js';
import { Product } from './Product.model.js';

@Table({
  tableName: 'basket_devices',
  timestamps: false,
})

export class BasketDevice extends Model {
  @Column({
    type: DataType.INTEGER,
  })
    quantity: number;

  @Unique
  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
  })
    productId: number;

  @ForeignKey(() => Basket)
  @Column({
    type: DataType.INTEGER,
  })
    basketId: number;

  @BelongsTo(() => Basket, {
    onDelete: 'CASCADE',
    foreignKey: 'basketId',
    targetKey: 'id',
  })
    basket: Basket | null;
}
