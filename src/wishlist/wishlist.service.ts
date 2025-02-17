import { Injectable, NotFoundException } from '@nestjs/common';
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

  // ✅ Wishlistga mahsulot qo‘shish
  async create(createWishlistDto: CreateWishlistDto) {
    const wishlistItem = await this.wishlistModel.create(createWishlistDto);
    return wishlistItem;
  }

  // ✅ Barcha wishlistlarni olish
  async findAll() {
    return await this.wishlistModel.findAll({
      include: [{ model: Product }],
    });
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

    return wishlist;
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
