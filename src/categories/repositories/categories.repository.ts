import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from '../entities';
import { Model } from 'mongoose';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async create(payload: CreateCategoryDto): Promise<Category> {
    const isSlugExist = await this.categoryModel
          .findOne({
            slug: payload.slug,
          })
          .lean();
        if (isSlugExist) {
          throw new NotFoundException('Slug already exists');
        }
       
    return await this.categoryModel.create(payload);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryModel.find().exec();
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }

  async update(id: string, payload: UpdateCategoryDto): Promise<Category> {
    const isSlugExist = await this.categoryModel
          .findOne({
            slug: payload.slug,
          })
          .lean();
        if (isSlugExist) {
          throw new NotFoundException('Slug already exists');
        }
    const category = await this.categoryModel.findByIdAndUpdate(id, payload, {
      new: true,
    });
    if (!category) {
      throw new NotFoundException(`Category is not found with the ${id}`);
    }
    return category;
  }

  async remove(id: string): Promise<Category> {
    const category = await this.categoryModel.findByIdAndDelete(id);
    if (!category) {
      throw new NotFoundException(`Category is not found with the ${id}`);
    }
    return category;
  }

  async isSlugAvailable(slug: string, categoryId?: string): Promise<boolean> {
    const query = { 'slug': slug };
    if (categoryId) {
      query['_id'] = { $ne: categoryId };
    }
    const count = await this.categoryModel.countDocuments(query);
    return count === 0;
  }
}
