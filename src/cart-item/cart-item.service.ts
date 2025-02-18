// cart-item.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { InjectModel } from '@nestjs/sequelize';
import { CartItem } from './cart-item.model';
import { Product } from '../products/products.model';

@Injectable()
export class CartItemService {
  constructor(
    @InjectModel(CartItem) private readonly cartItemModel: typeof CartItem,
  ) {}

  async create(createCartItemDto: CreateCartItemDto) {
    // Avval maxsulot savatchada borligini tekshirish
    const existingItem = await this.cartItemModel.findOne({
      where: {
        userId: createCartItemDto.userId,
        productId: createCartItemDto.productId,
      },
    });

    if (existingItem) {
      // Agar maxsulot allaqachon savatchada bo'lsa, quantity ni oshirish
      existingItem.quantity += createCartItemDto.quantity || 1;
      await existingItem.save();
      return existingItem;
    }

    // Yangi savat elementi yaratish
    const newCartItem = await this.cartItemModel.create({
      userId: createCartItemDto.userId,
      productId: createCartItemDto.productId,
      quantity: createCartItemDto.quantity || 1,
    });

    return newCartItem;
  }

  async findAll(userId?: number) {
    // Agar userId berilgan bo'lsa, shu foydalanuvchining savat elementlarini qaytarish
    const options: any = {};
    if (userId) {
      options.where = { userId };
    }

    options.include = [
      {
        model: Product,
        attributes: ['id', 'name', 'price', 'imageUrl', 'description'],
      },
    ];

    return this.cartItemModel.findAll(options);
  }

  async findAllByUserId(userId: number) {
    return this.cartItemModel.findAll({
      where: { userId },
      include: [
        {
          model: Product,
          attributes: ['id', 'name', 'price', 'imageUrl', 'description'],
        },
      ],
    });
  }

  async findOne(id: number) {
    const cartItem = await this.cartItemModel.findByPk(id, {
      include: [
        {
          model: Product,
          attributes: ['id', 'name', 'price', 'imageUrl', 'description'],
        },
      ],
    });

    if (!cartItem) {
      throw new NotFoundException(`Savat elementi #${id} topilmadi`);
    }

    return cartItem;
  }

  async update(id: number, updateCartItemDto: UpdateCartItemDto) {
    const cartItem = await this.cartItemModel.findByPk(id);

    if (!cartItem) {
      throw new NotFoundException(`Savat elementi #${id} topilmadi`);
    }

    // Quantity ning musbat son bo'lishini ta'minlash
    if (updateCartItemDto.quantity && updateCartItemDto.quantity < 1) {
      throw new Error("Miqdor 1 dan kam bo'lishi mumkin emas");
    }

    await cartItem.update(updateCartItemDto);
    return cartItem;
  }

  async remove(id: number) {
    const cartItem = await this.cartItemModel.findByPk(id);

    if (!cartItem) {
      throw new NotFoundException(`Savat elementi #${id} topilmadi`);
    }

    await cartItem.destroy();
    return { message: "Savat elementi muvaffaqiyatli o'chirildi" };
  }

  async removeAllByUserId(userId: number) {
    await this.cartItemModel.destroy({ where: { userId } });
    return { message: "Barcha savat elementlari muvaffaqiyatli o'chirildi" };
  }
}
