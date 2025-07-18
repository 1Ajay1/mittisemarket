import { Controller, Get, Post, Body, Param, Delete, Query, Put } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto';
import { CategoriesService } from '../services/categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.categoriesService.create(payload);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }

  @Get('check-slug')
  async checkSlug(
    @Query('slug') slug: string,
    @Query('categoryId') categoryId?: string,
  ): Promise<{ message: string; isAvailable: boolean }> {
    slug = slug.trim();
    const isAvailable = await this.categoriesService.checkSlugAvailability(
      slug,
      categoryId,
    );

    if (isAvailable) {
      return {
        message: `Slug '${slug}' is available and can be used.`,
        isAvailable: true,
      };
    } else {
      return { message: `Slug '${slug}' already exists.`, isAvailable: false };
    }
  }
}
