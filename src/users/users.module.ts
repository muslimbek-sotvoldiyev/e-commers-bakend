import { Module } from '@nestjs/common';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from './users.model.js';
import { ConfigService } from '../common/config/config.service.js';

@Module({
  imports: [SequelizeModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [UsersService, ConfigService],
  exports: [UsersService, ConfigService],
})
export class UsersModule {}
