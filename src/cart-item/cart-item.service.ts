import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { InjectModel } from '@nestjs/sequelize';
import { CartItem } from './cart-item.model';
import { Product } from '../products/products.model';
@Injectable()
export class CartItemService {
  constructor(
    @InjectModel(CartItem) private readonly cartItemModel: typeof CartItem,
  ) {}

  async create(createCartItemDto: CreateCartItemDto) {
    if (!createCartItemDto.userId || !createCartItemDto.productId) {
      throw new BadRequestException('userId va productId kerak');
    }

    const existingItem = await this.cartItemModel.findOne({
      where: {
        userId: createCartItemDto.userId,
        productId: createCartItemDto.productId,
      },
    });

    if (existingItem) {
      existingItem.quantity += createCartItemDto.quantity || 1;
      await existingItem.save();
      return existingItem;
    }

    return this.cartItemModel.create(createCartItemDto);
  }

  async findAll(userId: number) {
    if (!userId) {
      throw new Error('User ID is required');
    }

    const data = await this.cartItemModel.findAll({
      where: { userId },
    });
    return data.map((cart) => cart.product);
  }

  async findOne(userId: number) {
    const cartItems = await this.cartItemModel.findAll({
      where: { userId },
      include: [
        {
          model: Product,
          attributes: ['id', 'price', 'name', 'description'],
        },
      ],
      raw: true,
      nest: true,
    });

    if (!cartItems || cartItems.length === 0) {
      throw new NotFoundException(`Cart for user ${userId} not found`);
    }

    return cartItems;
  }
  async remove(userId: number, productId: number) {
    const cartItem = await this.cartItemModel.findOne({
      where: { userId, productId },
    });

    if (!cartItem) {
      throw new NotFoundException(`Cart item not found`);
    }

    await cartItem.destroy();
    return { message: 'Cart item removed successfully' };
  }
}
