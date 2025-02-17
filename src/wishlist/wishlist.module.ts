import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service.js';
import { WishlistController } from './wishlist.controller.js';
import { SequelizeModule } from '@nestjs/sequelize';
import { Wishlist } from './wishlist.model.js';
import { Users } from '../users/users.model.js';
import { Product } from '../products/products.model.js';

@Module({
  imports: [SequelizeModule.forFeature([Wishlist, Users, Product])],
  controllers: [WishlistController],
  providers: [WishlistService],
})
export class WishlistModule {}
