import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Wishlist } from './wishlist.model.js';
import { Product } from '../products/products.model.js';
import { Users } from '../users/users.model.js';
import { CreateWishlistDto } from './dto/create-wishlist.dto.js';

@Injectable()
export class WishlistService {
  constructor(
    @InjectModel(Wishlist) private readonly wishlistModel: typeof Wishlist,
  ) {}
  async create(createWishlistDto: CreateWishlistDto) {
    if (!createWishlistDto.user_id || !createWishlistDto.product_id) {
      throw new BadRequestException('user_id va product_id kerak');
    }
    return this.wishlistModel.create(createWishlistDto);
  }

  // ✅ Barcha wishlistlarni olish
  async findAll() {
    const data = await this.wishlistModel.findAll({
      include: [{ model: Product }],
    });

    return data.map((wishlist) => wishlist.product);
  }

  // ✅ Bitta foydalanuvchining wishlistini olish
  async findOne(user_id: number) {
    const wishlist = await this.wishlistModel.findAll({
      where: { user_id },
      include: [{ model: Product }],
    });

    if (!wishlist.length) {
      throw new NotFoundException(`Wishlist for user ${user_id} not found`);
    }

    return wishlist.map((item) => item.product);
  }

  // ✅ Wishlistdan mahsulot o‘chirish
  async remove(user_id: number, product_id: number) {
    const wishlistItem = await this.wishlistModel.findOne({
      where: { user_id, product_id },
    });

    if (!wishlistItem) {
      throw new NotFoundException(`Wishlist item not found`);
    }

    await wishlistItem.destroy();
    return { message: 'Wishlist item removed successfully' };
  }
}
