import { Module } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CartItemController } from './cart-item.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CartItem } from './cart-item.model';

import { Product } from 'src/products/products.model';

@Module({
  imports: [SequelizeModule.forFeature([CartItem, Product])],
  controllers: [CartItemController],
  providers: [CartItemService],
})
export class CartItemModule {}
