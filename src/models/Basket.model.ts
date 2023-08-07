'use strict';

import {
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { User } from './User.model.js';

@Table({
  tableName: 'baskets',
  timestamps: false,
})

export class Basket extends Model {
  @Unique
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
    userId: number;

  @HasOne(() => User, {
    onDelete: 'CASCADE',
  })
    user: User | null;
}
