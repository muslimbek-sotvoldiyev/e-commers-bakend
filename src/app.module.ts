import { ProductImagesModule } from './product_images/product_images.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CartItemModule } from './cart-item/cart-item.module';
import { SharedModule } from './common/shared.module';
import { CardInfoModule } from './card-info/card-info.module';
import { OrderItemModule } from './order-item/order-item.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    SharedModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      uri: process.env.DATABASE_URL,
      autoLoadModels: true,
      synchronize: true,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    }),

    // sync: { force: true },
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../', 'uploads'),
      serveRoot: '/static',
    }),

    ProductImagesModule,
    ProductsModule,
    CategoriesModule,
    WishlistModule,
    UsersModule,
    CartItemModule,
    CardInfoModule,
    OrderItemModule,
    OrderModule,
  ],
})
export class AppModule {}
