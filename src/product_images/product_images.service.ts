import { Injectable } from '@nestjs/common';
import { CreateProductImageDto } from './dto/create-product_image.dto.js';
import { UpdateProductImageDto } from './dto/update-product_image.dto.js';
import { InjectModel } from '@nestjs/sequelize';
import { ProductImage } from './product_images.model.js';

@Injectable()
export class ProductImagesService {
  constructor(@InjectModel(ProductImage) private readonly productImageModel: typeof ProductImage) {}
  create(createProductImageDto: CreateProductImageDto) {
    return this.productImageModel.create(createProductImageDto);
  }

  findAll() {
    return this.productImageModel.findAll();
  }

  findOne(id: number) {
    return this.productImageModel.findByPk(id);
  }

  update(id: number, updateProductImageDto: UpdateProductImageDto) {
    return `This action updates a #${id} productImage`;
  }

  remove(id: number) {
    return this.productImageModel.destroy({ where: { id } });
  }
}
