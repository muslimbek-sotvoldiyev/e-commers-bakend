import {
  Table,
  Column,
  Model,
  DataType,
  HasOne,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Order } from '../order/order.model';
import { Users } from '../users/users.model';

@Table({ tableName: 'CardInfo' })
export class CardInfo extends Model<CardInfo> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  number: string;

  @Column({ type: DataType.STRING, allowNull: false })
  date: string;

  @Column({ type: DataType.STRING, allowNull: true })
  cvv: string;

  @Column({ type: DataType.STRING, allowNull: false })
  full_name: string;

  @HasOne(() => Order)
  order: Order;

  @ForeignKey(() => Users)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @BelongsTo(() => Users)
  user: Users;
}
