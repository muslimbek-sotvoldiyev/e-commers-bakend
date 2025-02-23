import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Wishlist } from './wishlist.model.js';
import { Product } from '../products/products.model.js';
import { CreateWishlistDto } from './dto/create-wishlist.dto.js';
import { Category } from '../categories/categories.model.js';
import { ProductImage } from '../product_images/product_images.model.js';

@Injectable()
export class WishlistService {
  constructor(
    @InjectModel(Wishlist) private readonly wishlistModel: typeof Wishlist,
  ) {}
  async create(createWishlistDto: CreateWishlistDto) {
    const { user_id, product_id } = createWishlistDto;

    if (!user_id || !product_id) {
      throw new BadRequestException('user_id va product_id kerak');
    }

    const existingWishlistItem = await this.wishlistModel.findOne({
      where: { user_id, product_id },
    });

    if (existingWishlistItem) {
      throw new BadRequestException(
        'Bu mahsulot allaqachon wishlist-ga qo‘shilgan',
      );
    }

    return this.wishlistModel.create(createWishlistDto);
  }

  async findOne(user_id: number) {
    const wishlist = await this.wishlistModel.findAll({
      where: { user_id },
      include: [
        {
          model: Product,
          include: [{ model: ProductImage }, { model: Category }],
        },
      ],
    });

    if (!wishlist.length) {
      throw new NotFoundException(`Wishlist for user ${user_id} not found`);
    }

    return wishlist.map((item) => {
      const product = item.product;

      return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        sizes: JSON.parse(product.sizes || '[]'),
        colors: JSON.parse(product.colors || '[]'),
        rate: product.rate,
        category: {
          id: product.category?.id,
          name: product.category?.name,
        },
        images: product.images.map((img) => img.images),
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      };
    });
  }

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

  async clearWishlist(user_id: number) {
    const deletedCount = await this.wishlistModel.destroy({
      where: { user_id },
    });

    if (!deletedCount) {
      throw new NotFoundException(`Wishlist already empty`);
    }

    return { message: 'Wishlist cleared successfully' };
  }

  async toggleWishlist(user_id: number, product_id: number) {
    if (!user_id || !product_id) {
      throw new BadRequestException('user_id va product_id kerak');
    }

    const existingWishlistItem = await this.wishlistModel.findOne({
      where: { user_id, product_id },
    });

    if (existingWishlistItem) {
      await existingWishlistItem.destroy();
      return {
        message: 'Mahsulot wishlistdan olib tashlandi',
        status: 'removed',
      };
    }

    await this.wishlistModel.create({ user_id, product_id });
    return { message: 'Mahsulot wishlist-ga qo‘shildi', status: 'added' };
  }
}
