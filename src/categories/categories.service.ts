import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './categories.model.js';
import { Product } from '../products/products.model.js';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category) private readonly categoryModel: typeof Category) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.categoryModel.create(createCategoryDto);
  }
  async findAll(): Promise<Category[]> {
    return await this.categoryModel.findAll({
      include: [{ model: Product }],
    });
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryModel.findByPk(id, {
      include: [{ model: Product }],
    });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.findOne(id);
    return await category.update(updateCategoryDto);
  }

  async remove(id: number): Promise<{ message: string }> {
    const category = await this.findOne(id);
    await category.destroy();
    return { message: `Category with id ${id} has been deleted` };
  }
}
