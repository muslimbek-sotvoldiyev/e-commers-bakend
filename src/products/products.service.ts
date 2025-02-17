import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './products.model.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { ProductImage } from '../product_images/product_images.model.js';
import { Category } from '../categories/categories.model.js';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private readonly productModel: typeof Product,
    @InjectModel(ProductImage)
    private readonly productImageModel: typeof ProductImage,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    images: string[],
  ): Promise<Product> {
    const product = await this.productModel.create(createProductDto);
    if (images.length) {
      await Promise.all(
        images.map((url) =>
          this.productImageModel.create({ productId: product.id, images: url }),
        ),
      );
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
  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    imageUrls?: string[],
  ): Promise<Product> {
    const product = await this.findOne(id);
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
    const product = await this.findOne(id);
    await this.productImageModel.destroy({ where: { productId: id } });
    await product.destroy();
  }
}
