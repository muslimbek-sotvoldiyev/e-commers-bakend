import { Module } from '@nestjs/common';
import { CardInfoService } from './card-info.service';
import { CardInfoController } from './card-info.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CardInfo } from './card-info.model';
import { Order } from '../order/order.model';
import { ConfigService } from '../common/config/config.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [SequelizeModule.forFeature([CardInfo, Order]), UsersModule],
  controllers: [CardInfoController],
  providers: [CardInfoService, ConfigService],
})
export class CardInfoModule {}
