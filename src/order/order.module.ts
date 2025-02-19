import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './order.model';
import { Users } from '../users/users.model';
import { OrderItem } from '../order-item/order-item.model';
import { CardInfo } from '../card-info/card-info.model';
import { CartItemModule } from '../cart-item/cart-item.module';
import { CartItem } from '../cart-item/cart-item.model';
import { UsersModule } from '../users/users.module';
import { ConfigService } from '../common/config/config.service';
import { CartItemService } from 'src/cart-item/cart-item.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Order, Users, OrderItem, CardInfo, CartItem]),
    CartItemModule,
    UsersModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, ConfigService, CartItemService],
})
export class OrderModule {}
