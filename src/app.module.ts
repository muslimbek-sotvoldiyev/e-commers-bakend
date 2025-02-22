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
      host: process.env.PGHOST,
      port: Number(process.env.PGPORT),
      username: process.env.POSTGRES_DB,
      password: process.env.PGPASSWORD,
      database: process.env.PGUSER,
      autoLoadModels: true,
      synchronize: true,
      // sync: { force: true },
    }),

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
