import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './order.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderItem } from '../order-item/order-item.model';
import { CartItem } from '../cart-item/cart-item.model';
import { CartItemService } from '../cart-item/cart-item.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order) private orderModel: typeof Order,
    @InjectModel(OrderItem) private orderItemModel: typeof OrderItem,
    @InjectModel(CartItem) private cartItemModel: typeof CartItem,
    private cartItemService: CartItemService,
  ) {}

  async create(userId: number, createOrderDto: CreateOrderDto) {
    try {
      const { cardInfoId, long, lat } = createOrderDto;

      const cartItems = await this.cartItemService.findOne(userId);

      const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.quantity * item.product.price,
        0,
      );

      const order = await this.orderModel.create({
        UserId: userId,
        status: 'panding',
        long,
        lat,
        totalPrice,
        CardInfoId: cardInfoId,
      });

      for (const item of cartItems) {
        console.log('Creating OrderItem with:', {
          orderId: order.id,
          productId: item.productId,
          count: item.quantity,
          size: item.size,
          color: item.color,
        });

        await this.orderItemModel.create({
          orderId: order.id,
          productId: item.productId,
          count: item.quantity,
          size: item.size,
          color: item.color,
        });
      }

      await this.cartItemModel.destroy({ where: { userId } });

      const fullOrder = await this.orderModel.findByPk(order.id, {
        include: [
          {
            model: OrderItem,
            include: ['product'],
          },
        ],
      });

      return fullOrder;
    } catch (error) {
      console.error('Order yaratishda xatolik:', error);
      throw new Error(`Order yaratishda xatolik yuz berdi: ${error.message}`);
    }
  }

  async findAll(userId: number) {
    return this.orderModel.findAll({
      where: { UserId: userId },
      include: [
        {
          model: OrderItem,
          include: ['product'],
        },
      ],
    });
  }

  async findOne(id: number) {
    const order = await this.orderModel.findByPk(id, {
      include: [
        {
          model: OrderItem,
          include: ['product'],
        },
      ],
    });

    if (!order) {
      throw new NotFoundException(`Order ${id} topilmadi.`);
    }

    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.findOne(id);
    return order.update(updateOrderDto);
  }

  async remove(id: number) {
    const order = await this.findOne(id);
    await this.orderItemModel.destroy({ where: { orderId: id } });
    await order.destroy();
    return { message: "Order o'chirildi" };
  }
}
