import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller.js';
import { ProductsService } from './products.service.js';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './products.model.js';
import { ProductImage } from '../product_images/product_images.model.js';
import { Wishlist } from '../wishlist/wishlist.model.js';
import { Users } from '../users/users.model.js';
import { Category } from '../categories/categories.model.js';
import { CartItem } from '../cart-item/cart-item.model.js';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Product,
      ProductImage,
      Category,
      Users,
      Wishlist,
      CartItem,
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
