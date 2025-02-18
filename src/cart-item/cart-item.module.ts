import { Module } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CartItemController } from './cart-item.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CartItem } from './cart-item.model';

import { Product } from '../products/products.model';
import { UsersModule } from '../users/users.module';
import { ConfigService } from '../common/config/config.service';

@Module({
  imports: [SequelizeModule.forFeature([CartItem, Product]), UsersModule],
  controllers: [CartItemController],
  providers: [CartItemService, ConfigService],
})
export class CartItemModule {}
