'use strict';

import {
  Column,
  DataType,
  Model,
  AllowNull,
  Table,
  Unique,
} from 'sequelize-typescript';

@Table({
  tableName: 'namespaces',
  timestamps: false,
})
export class Namespace extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.DATE,
  })
  createdAt: Date;

  @AllowNull(false)
  @Unique
  @Column({
    type: DataType.STRING,
  })
  title: string;
}
