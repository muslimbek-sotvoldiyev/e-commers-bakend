import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { Product } from '../products/products.model.js';
import { Wishlist } from '../wishlist/wishlist.model.js';

@Table({
  tableName: 'users',
})
export class Users extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  first_name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  second_name: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING, allowNull: false })
  photo: string;

  @Column({ type: DataType.ENUM('admin', 'customer'), allowNull: false })
  role: string;

  @HasMany(() => Wishlist)
  wishlists: Wishlist[];
}
