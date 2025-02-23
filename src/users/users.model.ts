import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  HasOne,
} from 'sequelize-typescript';
import { Wishlist } from '../wishlist/wishlist.model.js';
import { CartItem } from '../cart-item/cart-item.model.js';
import { Order } from '../order/order.model.js';
import { CardInfo } from '../card-info/card-info.model.js';

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

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  avatar: string;

  @Column({
    type: DataType.ENUM('admin', 'customer'),
    allowNull: false,
    defaultValue: 'customer',
  })
  role: string;

  @HasMany(() => Wishlist)
  wishlists: Wishlist[];

  @HasMany(() => CartItem)
  cartItems: CartItem[];

  @HasOne(() => Order)
  order: Order;

  @HasMany(() => CardInfo)
  cardInfos: CardInfo[];
}
