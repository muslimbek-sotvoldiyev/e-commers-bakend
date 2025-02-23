import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './categories.model';
import { Product } from '../products/products.model';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category) private readonly categoryModel: typeof Category,
  ) {}

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

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.findOne(id);
    return await category.update(updateCategoryDto);
  }

  async remove(id: number) {
    const defaultCategoryId = 1;

    const [updatedCount] = await Product.update(
      { category_id: defaultCategoryId },
      { where: { category_id: id } },
    );
    console.log(
      `Updated ${updatedCount} products from category ${id} to ${defaultCategoryId}`,
    );

    const deletedCount = await Category.destroy({ where: { id } });
    if (deletedCount === 0) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    return {
      message: 'Category deleted successfully',
      affectedProducts: updatedCount,
    };
  }
}
