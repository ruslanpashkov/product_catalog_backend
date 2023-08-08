'use strict';

import {
  AllowNull,
  Column,
  DataType,
  HasOne,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Basket } from './Basket.model.js';

@Table({
  tableName: 'users',
  timestamps: false,
})

export class User extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.DATE,
  })
    createdAt: Date;

  @Unique
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    email: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    hashPassword: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    firstName: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    lastName: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    role: string;

  @HasOne(() => Basket, {
    onDelete: 'CASCADE'
  })
    basket: Basket | null;
}
