import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  ForbiddenException,
  Put,
} from '@nestjs/common';
import { Roles } from '../common/guards/role.decorator';
import { Role, RolesGuard } from '../common/guards/role.guard';
import { AuthGuardd } from '../common/guards/auth.guard';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { CartItemService } from './cart-item.service';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Controller('cart-item')
export class CartItemController {
  constructor(private readonly cartService: CartItemService) {}

  @Post()
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @UseGuards(AuthGuardd, RolesGuard)
  create(@Body() createCartItemDto: CreateCartItemDto, @Req() req) {
    createCartItemDto.userId = req.user.dataValues.id;
    return this.cartService.create(createCartItemDto);
  }

  @Get('all')
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @UseGuards(AuthGuardd, RolesGuard)
  findAll() {
    return this.cartService.findAll();
  }

  @Put(':id')
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @UseGuards(AuthGuardd, RolesGuard)
  update(
    @Param('id') id: number,
    @Body() updateCartItemDto: UpdateCartItemDto,
    @Req() req,
  ) {
    return this.cartService.update(
      +id,
      updateCartItemDto,
      req.user.dataValues.id,
    );
  }

  @Get()
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @UseGuards(AuthGuardd, RolesGuard)
  findOne(@Req() req) {
    return this.cartService.findOne(+req.user.dataValues.id);
  }

  @Delete('/:product_id')
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @UseGuards(AuthGuardd, RolesGuard)
  remove(@Param('product_id') product_id: number, @Req() req) {
    return this.cartService.remove(+req.user.dataValues.id, product_id);
  }
}
