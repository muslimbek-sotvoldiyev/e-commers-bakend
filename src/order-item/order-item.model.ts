import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Order } from '../order/order.model';
import { Product } from '../products/products.model';

@Table({ tableName: 'order_items' })
export class OrderItem extends Model<OrderItem> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  orderId: number;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER, allowNull: false })
  productId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  count: number;

  @Column({ type: DataType.STRING, allowNull: true })
  size: string;

  @Column({ type: DataType.STRING, allowNull: true })
  color: string;

  @BelongsTo(() => Order)
  order: Order;

  @BelongsTo(() => Product)
  product: Product;
}
