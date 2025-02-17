import { Module } from '@nestjs/common';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from './users.model.js';
import { ConfigService } from '../common/config/config.service.js';
import { Wishlist } from '../wishlist/wishlist.model.js';
import { Product } from '../products/products.model.js';
import { ProductImage } from '../product_images/product_images.model.js';

@Module({
  imports: [SequelizeModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [UsersService, ConfigService],
  
})
export class UsersModule {}
