'use strict';

import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Namespace } from './Namespace.model.js';
import { Product } from './Product.model.js';

@Table({
  tableName: 'phones',
  timestamps: false,
})
export class Phone extends Model {
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
    type: DataType.STRING,
  })
    camera: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    zoom: string;

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
