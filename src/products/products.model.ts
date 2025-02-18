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

@Table({ tableName: 'products' })
export class Product extends Model<Product> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  description: string;

  @Column({ type: DataType.STRING, allowNull: false })
  price: number;

  @Column({ type: DataType.JSONB, defaultValue: [] })
  sizes: string[];

  @Column({ type: DataType.JSONB, defaultValue: [] })
  colors: string[];

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER, allowNull: false })
  category_id: number;

  @BelongsTo(() => Category)
  category: Category;

  @HasMany(() => ProductImage)
  images: ProductImage[];

  @HasOne(() => CartItem)
  cartItem: CartItem;
}
