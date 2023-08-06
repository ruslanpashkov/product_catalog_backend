'use strict';

import {
  Column,
  Unique,
  DataType,
  Model,
  AllowNull,
  Table,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
} from 'sequelize-typescript';
import { Product } from './Product.model.js';
import { Namespace } from './Namespace.model.js';

@Table({
  tableName: 'accessories',
  timestamps: false,
})
export class Accessory extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.DATE,
  })
    createdAt: Date;

  @AllowNull(false)
  @PrimaryKey
  @Column({
    type: DataType.STRING,
  })
    id: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    resolution: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    processor: string;

  @AllowNull(false)
  @Column({
    type: DataType.ARRAY(DataType.STRING)
  })
    cell: string[];

  @AllowNull(false)
  @ForeignKey(() => Namespace)
  @Column({
    type: DataType.INTEGER,
  })
    namespaceId: number;

  @AllowNull(false)
  @Unique
  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
  })
    productId: number;

  @BelongsTo(() => Product, {
    onDelete: 'CASCADE',
    foreignKey: 'productId',
    targetKey: 'id',
  })
    product: Product | null;

  @BelongsTo(() => Namespace, {
    onDelete: 'RESTRICT',
    foreignKey: 'namespaceId',
    targetKey: 'id',
  })
    namespace: Namespace | null;
}
