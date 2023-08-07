'use strict';

import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
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

  @BelongsTo(() => User, {
    onDelete: 'CASCADE',
    foreignKey: 'userId',
    targetKey: 'id'
  })
    user: User | null;
}
