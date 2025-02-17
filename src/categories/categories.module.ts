import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service.js';
import { CategoriesController } from './categories.controller.js';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './categories.model.js';
import { Product } from '../products/products.model.js';

@Module({
  imports: [SequelizeModule.forFeature([Category, Product])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
