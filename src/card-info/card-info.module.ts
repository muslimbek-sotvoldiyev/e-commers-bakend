import { Module } from '@nestjs/common';
import { CardInfoService } from './card-info.service';
import { CardInfoController } from './card-info.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CardInfo } from './card-info.model';
import { Order } from '../order/order.model';

@Module({
  imports: [SequelizeModule.forFeature([CardInfo, Order])],
  controllers: [CardInfoController],
  providers: [CardInfoService],
})
export class CardInfoModule {}
