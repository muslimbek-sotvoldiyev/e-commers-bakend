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

@Table({ tableName: 'wishlist' })
export class Wishlist extends Model<Wishlist> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Users)
  @Column({ type: DataType.INTEGER, allowNull: false })
  user_id: number;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER, allowNull: false })
  product_id: number;

  @BelongsTo(() => Users)
  user: Users;

  @BelongsTo(() => Product)
  product: Product;
}
