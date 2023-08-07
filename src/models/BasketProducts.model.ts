'use strict';

import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Min,
  Model,
  Table,
} from 'sequelize-typescript';
import { Basket } from './Basket.model.js';
import { Product } from './Product.model.js';

@Table({
  tableName: 'basketProducts',
  timestamps: false,
})

export class BasketProducts extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.DATE,
  })
    createdAt: Date;

  @AllowNull(false)
  @Min(1)
  @Column({
    type: DataType.INTEGER,
  })
    quantity: number;

  @AllowNull(false)
  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
  })
    productId: number;

  @AllowNull(false)
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

  @BelongsTo(() => Product, {
    onDelete: 'CASCADE',
    foreignKey: 'productId',
    targetKey: 'id',
  })
    product: Product | null;
}
