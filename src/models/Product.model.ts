'use strict';

import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Accessory } from './Accessory.model.js';
import { BasketProducts } from './BasketProducts.model.js';
import { Category } from './Category.model.js';
import { Color } from './Color.model.js';
import { Phone } from './Phone.model.js';
import { Tablet } from './Tablet.model.js';

@Table({
  tableName: 'products',
  timestamps: false,
})
export class Product extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.DATE,
  })
    createdAt: Date;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    name: string;

  @AllowNull(false)
  @Column({
    type: DataType.FLOAT,
  })
    fullPrice: number;

  @AllowNull(false)
  @Column({
    type: DataType.FLOAT,
  })
    price: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    screen: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    capacity: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    ram: string;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
    year: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    image: string;

  @AllowNull(false)
  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
  })
    categoryId: number;

  @AllowNull(false)
  @ForeignKey(() => Color)
  @Column({
    type: DataType.INTEGER,
  })
    colorId: number;

  @BelongsTo(() => Category, {
    onDelete: 'RESTRICT',
    foreignKey: 'categoryId',
    targetKey: 'id',
  })
    category: Category | null;

  @BelongsTo(() => Color, {
    onDelete: 'RESTRICT',
    foreignKey: 'colorId',
    targetKey: 'id',
  })
    color: Color | null;

  @HasOne(() => Phone, {
    onDelete: 'CASCADE',
  })
    itemPhone: Phone | null;

  @HasOne(() => Tablet, {
    onDelete: 'CASCADE',
  })
    itemTablet: Tablet | null;

  @HasOne(() => Accessory, {
    onDelete: 'CASCADE',
  })
    itemAccessory: Accessory | null;

  @HasMany(() => BasketProducts, {
    onDelete: 'RESTRICT',
  })
    basketProduct: BasketProducts[] | null;
}
