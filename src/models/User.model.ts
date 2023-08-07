'use strict';

import {
  Column,
  DataType,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Basket } from './Basket.model.js';

@Table({
  tableName: 'users',
  timestamps: false,
})

export class User extends Model {
  @Column({
    type: DataType.STRING,
  })
    email: string;

  @Column({
    type: DataType.STRING,
  })
    password: string;

  @Column({
    type: DataType.STRING,
  })
    firstName: string;

  @Column({
    type: DataType.STRING,
  })
    lastName: string;

  @Column({
    type: DataType.STRING,
  })
    role: string;

  @HasOne(() => Basket, {
    onDelete: 'CASCADE'
  })
    basket: Basket | null;
}
