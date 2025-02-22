import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service.js';
import { CreateWishlistDto } from './dto/create-wishlist.dto.js';
import { Roles } from '../common/guards/role.decorator.js';
import { AuthGuardd } from '../common/guards/auth.guard.js';
import { Role, RolesGuard } from '../common/guards/role.guard.js';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Roles(Role.ADMIN, Role.CUSTOMER)
  @UseGuards(AuthGuardd, RolesGuard)
  @Post()
  create(@Req() req, @Body() createWishlistDto: CreateWishlistDto) {
    console.log(createWishlistDto);
    createWishlistDto.user_id = req.user.dataValues.id;
    return this.wishlistService.create(createWishlistDto);
  }

  @Roles(Role.ADMIN, Role.CUSTOMER)
  @UseGuards(AuthGuardd, RolesGuard)
  @Get()
  findOne(@Req() req) {
    return this.wishlistService.findOne(+req.user.dataValues.id);
  }

  @Roles(Role.ADMIN, Role.CUSTOMER)
  @UseGuards(AuthGuardd, RolesGuard)
  @Delete('clear')
  async clearWishlist(@Req() req) {
    const user_id = req.user.dataValues.id;
    return this.wishlistService.clearWishlist(+user_id);
  }

  @Roles(Role.ADMIN, Role.CUSTOMER)
  @UseGuards(AuthGuardd, RolesGuard)
  @Delete('/:product_id')
  remove(@Req() req, @Param('product_id') product_id: string) {
    return this.wishlistService.remove(+req.user.dataValues.id, +product_id);
  }

  @Roles(Role.ADMIN, Role.CUSTOMER)
  @UseGuards(AuthGuardd, RolesGuard)
  @Post('toggle/:product_id')
  async toggleWishlist(@Req() req, @Param('product_id') product_id: number) {
    const user_id = req.user.dataValues.id;
    return this.wishlistService.toggleWishlist(user_id, Number(product_id));
  }
}
