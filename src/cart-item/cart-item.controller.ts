// cart-item.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Controller('cart-items')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Post()
  create(@Body() createCartItemDto: CreateCartItemDto, @Req() req) {
    createCartItemDto.userId = req.user.id;
    return this.cartItemService.create(createCartItemDto);
  }

  @Get()
  findAll(@Req() req, @Query('userId') userId?: number) {
    if (req.user.role === 'admin' && userId) {
      return this.cartItemService.findAll(userId);
    }
    return this.cartItemService.findAllByUserId(req.user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req) {
    const cartItem = await this.cartItemService.findOne(+id);
    if (req.user.role !== 'admin' && cartItem.userId !== req.user.id) {
      throw new Error("Siz faqat o'z savat elementlaringizni ko'ra olasiz");
    }
    return cartItem;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
    @Req() req,
  ) {
    const cartItem = await this.cartItemService.findOne(+id);
    if (req.user.role !== 'admin' && cartItem.userId !== req.user.id) {
      throw new Error("Siz faqat o'z savat elementlaringizni yangilay olasiz");
    }
    return this.cartItemService.update(+id, updateCartItemDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req) {
    const cartItem = await this.cartItemService.findOne(+id);
    // Faqat admin yoki o'zining savat elementini o'chira oladi
    if (req.user.role !== 'admin' && cartItem.userId !== req.user.id) {
      throw new Error("Siz faqat o'z savat elementlaringizni o'chira olasiz");
    }
    return this.cartItemService.remove(+id);
  }

  @Delete('user/me')
  removeAllMine(@Req() req) {
    return this.cartItemService.removeAllByUserId(req.user.id);
  }

  @Delete('user/:userId')
  removeAllByUserId(@Param('userId') userId: string, @Req() req) {
    if (req.user.role !== 'admin' && +userId !== req.user.id) {
      throw new Error("Siz faqat o'z savat elementlaringizni o'chira olasiz");
    }
    return this.cartItemService.removeAllByUserId(+userId);
  }
}
