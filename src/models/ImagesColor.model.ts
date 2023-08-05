'use strict';

import {
  Column,
  DataType,
  Model,
  AllowNull,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Namespace } from './Namespace.model.js';
import { Color } from './Color.model.js';

@Table({
  tableName: 'imagesColor',
  timestamps: false,
})
export class ImagesColor extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.DATE,
  })
    createdAt: Date;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    imagePath: string;

  @AllowNull(false)
  @ForeignKey(() => Namespace)
  @Column({
    type: DataType.INTEGER,
  })
    namespaceId: number;

  @AllowNull(false)
  @ForeignKey(() => Color)
  @Column({
    type: DataType.INTEGER,
  })
    colorId: number;

  @BelongsTo(() => Color, {
  })
    color: Color | null;
}
