import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
  HasOne,
} from 'sequelize-typescript';
import { ProductImage } from '../product_images/product_images.model.js';
import { Category } from '../categories/categories.model.js';
import { CartItem } from '../cart-item/cart-item.model.js';
import { OrderItem } from '../order-item/order-item.model.js';

@Table({ tableName: 'products' })
export class Product extends Model<Product> {
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  description: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  price: number;

  @Column({
    type: DataType.STRING,
  })
  sizes: string;

  @Column({
    type: DataType.STRING,
  })
  colors: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: () => Math.floor(Math.random() * 5) + 1,
  })
  rate: number;

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER, allowNull: false })
  category_id: number;

  @BelongsTo(() => Category)
  category: Category;

  @HasMany(() => ProductImage)
  images: ProductImage[];

  @HasOne(() => CartItem)
  cartItem: CartItem;

  @HasOne(() => OrderItem)
  orderItem: OrderItem;
}
