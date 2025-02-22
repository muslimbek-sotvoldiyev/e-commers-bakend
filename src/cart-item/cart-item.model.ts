import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Product } from '../products/products.model.js';
import { Users } from '../users/users.model.js';

@Table({ tableName: 'cartItems' })
export class CartItem extends Model<CartItem> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Users)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @BelongsTo(() => Users)
  user: Users;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER, allowNull: false })
  productId: number;

  @Column({ type: DataType.STRING, allowNull: true })
  size: string;

  @Column({ type: DataType.STRING, allowNull: true })
  color: string;

  @BelongsTo(() => Product)
  product: Product;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 1,
  })
  quantity: number;
}
