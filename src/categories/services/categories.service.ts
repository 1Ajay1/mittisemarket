import { Injectable } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto';
import { Category } from '../entities';
import { CategoryRepository } from '../repositories/categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  async create(payload: CreateCategoryDto): Promise<Category> {
    return await this.categoryRepository.create(payload);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.findAll();
  }

  async findOne(id: string): Promise<Category> {
    return await this.categoryRepository.findOne(id);
  }

  async update(
    id: string,
    payload: UpdateCategoryDto,
  ): Promise<Category> {
    return await this.categoryRepository.update(id, payload);
  }

  async remove(id: string): Promise<Category> {
    return await this.categoryRepository.remove(id);
  }
}
