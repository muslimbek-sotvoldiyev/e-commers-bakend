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
} from '@nestjs/common';
import { Roles } from '../common/guards/role.decorator';
import { Role, RolesGuard } from '../common/guards/role.guard';
import { AuthGuardd } from '../common/guards/auth.guard';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { CartItemService } from './cart-item.service';

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

  @Get()
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @UseGuards(AuthGuardd, RolesGuard)
  findAll(@Req() req) {
    return this.cartService.findAll(req.user.dataValues.id);
  }

  @Get(':user_id')
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @UseGuards(AuthGuardd, RolesGuard)
  findOne(@Param('user_id') user_id: number, @Req() req) {
    if (user_id !== req.user.dataValues.id) {
      throw new ForbiddenException("Siz faqat o'z cartini ko'ra olasiz");
    }
    return this.cartService.findOne(user_id);
  }

  @Delete(':user_id/:product_id')
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @UseGuards(AuthGuardd, RolesGuard)
  remove(
    @Param('user_id') user_id: number,
    @Param('product_id') product_id: number,
    @Req() req,
  ) {
    if (user_id !== req.user.dataValues.id) {
      throw new ForbiddenException(
        "Siz faqat o'z cartidan mahsulotni o'chira olasiz",
      );
    }
    return this.cartService.remove(user_id, product_id);
  }
}
