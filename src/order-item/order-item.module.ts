import { Module } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItemController } from './order-item.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderItem } from './order-item.model';
import { Product } from '../products/products.model';
import { Order } from '../order/order.model';

@Module({
  imports: [SequelizeModule.forFeature([OrderItem, Product, Order])],
  controllers: [OrderItemController],
  providers: [OrderItemService],
})
export class OrderItemModule {}
