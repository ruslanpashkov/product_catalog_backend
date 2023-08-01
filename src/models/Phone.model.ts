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
  @Unique
  @ForeignKey(() => Namespace)
  @Column({
    type: DataType.INTEGER,
    field: 'namespace_id',
  })
  namespaceId: number;

  @AllowNull(false)
  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    field: 'product_id',
  })
  productId: number;

  @BelongsTo(() => Product, {
    onDelete: 'CASCADE',
    foreignKey: 'product_id',
    targetKey: 'id',
  })
  item: Product | null;

  @BelongsTo(() => Namespace, {
    onDelete: 'RESTRICT',
    foreignKey: 'namespace_id',
    targetKey: 'id',
  })
  namespace: Namespace | null;
}
