import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './products.model.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { ProductImage } from '../product_images/product_images.model.js';
import { Category } from '../categories/categories.model.js';
import { Op } from 'sequelize';
import { Wishlist } from '../wishlist/wishlist.model.js';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private readonly productModel: typeof Product,
    @InjectModel(Wishlist) private wishlistModel: typeof Wishlist,
    @InjectModel(ProductImage)
    private readonly productImageModel: typeof ProductImage,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    images: string[],
  ): Promise<Product> {
    let productData = { ...createProductDto };

    productData = {
      ...productData,
    };

    const product = await this.productModel.create(productData);

    if (images.length) {
      for (const url of images) {
        console.log(url);
        await this.productImageModel.create({
          productId: product.id,
          images: url,
        });
      }
    }
    return product;
  }

  async findAll(): Promise<any[]> {
    const products = await this.productModel.findAll({
      include: [ProductImage, Category],
    });

    return products.map((product) => ({
      ...product.toJSON(),
      category: product.category ? product.category.name : null,
      images: product.images.map((img) => img.images),
    }));
  }

  async findOne(id: number): Promise<any> {
    const product = await this.productModel.findByPk(id, {
      include: [ProductImage, Category],
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return {
      ...product.toJSON(),
      category: product.category ? product.category.name : null,
      images: product.images.map((img) => img.images),
    };
  }

  async findOneRaw(id: number): Promise<Product> {
    const product = await this.productModel.findByPk(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    imageUrls?: string[],
  ): Promise<Product> {
    const product = await this.productModel.findByPk(id);

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    await product.update(updateProductDto);

    if (imageUrls) {
      await this.productImageModel.destroy({ where: { productId: id } });
      await Promise.all(
        imageUrls.map((url) =>
          this.productImageModel.create({ productId: id, images: url }),
        ),
      );
    }
    return product;
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOneRaw(id);

    await this.wishlistModel.destroy({
      where: { product_id: id },
    });

    await this.productImageModel.destroy({
      where: { productId: id },
    });

    // Delete the product
    await product.destroy();
  }

  async search(query: string) {
    console.log('query: ', query);

    if (!query || query.trim().length === 0) {
      return [];
    }

    query = query.trim(); // Keraksiz bo‘sh joylarni olib tashlaymiz

    const products = await this.productModel.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.iLike]: `%${query}%`,
            },
          },
          {
            description: {
              [Op.iLike]: `%${query}%`,
            },
          },
        ],
      },
      include: [ProductImage, Category],
      limit: 10,
    });

    return products.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category ? product.category.name : null,
      images: product.images ? product.images.map((img) => img.images) : [],
    }));
  }
}
