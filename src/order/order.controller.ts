import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Roles } from '../common/guards/role.decorator';
import { Role, RolesGuard } from '../common/guards/role.guard';
import { AuthGuardd } from '../common/guards/auth.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Roles(Role.ADMIN, Role.CUSTOMER)
  @UseGuards(AuthGuardd, RolesGuard)
  @Post()
  create(@Req() req, @Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(req.user.dataValues.id, createOrderDto);
  }
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @UseGuards(AuthGuardd, RolesGuard)
  @Get()
  findAll(@Req() req) {
    return this.orderService.findAll(req.user.dataValues.id);
  }

  @Roles(Role.ADMIN, Role.CUSTOMER)
  @UseGuards(AuthGuardd, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Roles(Role.ADMIN, Role.CUSTOMER)
  @UseGuards(AuthGuardd, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Roles(Role.ADMIN, Role.CUSTOMER)
  @UseGuards(AuthGuardd, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
