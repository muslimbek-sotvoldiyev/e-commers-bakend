import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service.js';
import { CategoriesController } from './categories.controller.js';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './categories.model.js';
import { Product } from '../products/products.model.js';
import { UsersModule } from '../users/users.module.js';
import { ConfigService } from '../common/config/config.service.js';

@Module({
  imports: [SequelizeModule.forFeature([Category, Product]), UsersModule],
  controllers: [CategoriesController],
  providers: [CategoriesService, ConfigService],
})
export class CategoriesModule {}
