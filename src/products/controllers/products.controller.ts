import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { CreateProductDto, FilterProductsDto, UpdateProductDto } from '../dto';
import { Product } from '../entities';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() payload: CreateProductDto): Promise<Product> {
    return await this.productsService.create(payload);
  }

  @Post("bulk")
  async createBulk(@Body() payload: CreateProductDto[]): Promise<Product[]> {
    return await this.productsService.createBulk(payload);
  }

  @Get()
  async findAll(
    @Query() filters: FilterProductsDto,
  ): Promise<{ data: Product[]; total: Number }> {
    return await this.productsService.findAll(filters);
  }

  @Get("status/count")
  async statusCount() {
    return await this.productsService.statusCount();
  }

  @Get('id/:id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return await this.productsService.findOne(id);
  }

  @Get(':slug')
  async findBySlug(@Param('slug') slug: string): Promise<Product> {
    return await this.productsService.findBySlug(slug);
  }

  @Put(':slug')
  async update(
    @Param('slug') slug: string,
    @Body() payload: UpdateProductDto,
  ): Promise<Product> {
    return await this.productsService.update(slug, payload);
  }

  @Delete(':slug')
  async remove(@Param('slug') slug: string): Promise<Product> {
    return await this.productsService.remove(slug);
  }
}
