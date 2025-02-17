import { Module } from '@nestjs/common';
import { ProductImagesService } from './product_images.service.js';
import { ProductImagesController } from './product_images.controller.js';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductImage } from './product_images.model.js';
import { Product } from '../products/products.model.js';
import { Wishlist } from '../wishlist/wishlist.model.js';
import { Users } from '../users/users.model.js';

@Module({
  imports: [SequelizeModule.forFeature([ProductImage, Product])],
  controllers: [ProductImagesController],
  providers: [ProductImagesService],
})
export class ProductImagesModule {}