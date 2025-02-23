import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { CardInfo } from '../card-info/card-info.model';
import { OrderItem } from '../order-item/order-item.model';
import { Users } from '../users/users.model';

@Table({ tableName: 'Order' })
export class Order extends Model<Order> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({
    type: DataType.ENUM('panding', 'undone', 'done'),
    allowNull: false,
  })
  status: 'panding' | 'undone' | 'done';

  @ForeignKey(() => Users)
  @Column({ type: DataType.INTEGER, allowNull: false })
  UserId: number;

  @BelongsTo(() => Users)
  user: Users;

  @Column({ type: DataType.FLOAT, allowNull: false })
  long: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  lat: number;

  @Column({ type: DataType.STRING, allowNull: true })
  description: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  totalPrice: number;

  @ForeignKey(() => CardInfo)
  @Column({ type: DataType.INTEGER, allowNull: true })
  CardInfoId: number;

  @BelongsTo(() => CardInfo)
  cardInfo: CardInfo;

  @HasMany(() => OrderItem)
  orderItems: OrderItem[];
}
