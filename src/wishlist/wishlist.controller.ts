import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { WishlistService } from './wishlist.service.js';
import { CreateWishlistDto } from './dto/create-wishlist.dto.js';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post()
  create(@Body() createWishlistDto) {
    console.log(createWishlistDto);

    return this.wishlistService.create(createWishlistDto);
  }

  @Get()
  findAll() {
    return this.wishlistService.findAll();
  }

  @Get(':user_id')
  findOne(@Param('user_id') user_id: string) {
    return this.wishlistService.findOne(+user_id);
  }

  @Delete(':user_id/:product_id')
  remove(
    @Param('user_id') user_id: string,
    @Param('product_id') product_id: string,
  ) {
    return this.wishlistService.remove(+user_id, +product_id);
  }
}
