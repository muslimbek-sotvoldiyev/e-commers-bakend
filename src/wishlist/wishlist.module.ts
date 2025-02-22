import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service.js';
import { WishlistController } from './wishlist.controller.js';
import { SequelizeModule } from '@nestjs/sequelize';
import { Wishlist } from './wishlist.model.js';
import { Users } from '../users/users.model.js';
import { Product } from '../products/products.model.js';
import { ConfigService } from '../common/config/config.service.js';
import { UsersModule } from '../users/users.module.js';
import { ProductImage } from '../product_images/product_images.model.js';

@Module({
  imports: [
    SequelizeModule.forFeature([Wishlist, Users, Product, ProductImage]),
    UsersModule,
  ],
  controllers: [WishlistController],
  providers: [WishlistService, ConfigService],
})
export class WishlistModule {}
