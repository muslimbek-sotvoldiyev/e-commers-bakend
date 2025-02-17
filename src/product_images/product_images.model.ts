import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Product } from '../products/products.model.js';

@Table({ tableName: 'product_images' })
export class ProductImage extends Model<ProductImage> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER, allowNull: false })
  productId: number;

  @Column({ type: DataType.STRING, allowNull: false })
  images: string;

  @BelongsTo(() => Product)
  product: Product;
}
