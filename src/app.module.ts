import { ProductImagesModule } from './product_images/product_images.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PGHOST || '127.0.0.1',
      port: Number(process.env.PGPORT || 5432),
      username: process.env.POSTGRES_DB || 'postgres',
      password: process.env.PGPASSWORD || '123456',
      database: process.env.PGUSER || 'postgres',
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
  ],
})
export class AppModule {}
