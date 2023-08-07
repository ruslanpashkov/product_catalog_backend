'use strict';

import {
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

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
    role: string;
}
