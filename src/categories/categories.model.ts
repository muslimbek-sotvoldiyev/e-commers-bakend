import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Product } from '../products/products.model.js'; 

@Table({ tableName: 'categories' })
export class Category extends Model<Category> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @HasMany(() => Product)
  products: Product[];
}
