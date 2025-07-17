import { Injectable } from '@nestjs/common';
import { CreateProductDto, FilterProductsDto, UpdateProductDto } from '../dto';
import { ProductsRepository } from '../repositories/products.repositories';
import { Product } from '../entities';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductsRepository) {}

  async create(payload: CreateProductDto): Promise<Product> {
    return await this.productRepository.create(payload);
  }

  async createBulk(payload: CreateProductDto[]): Promise<Product[]> {
    return await this.productRepository.createBulk(payload);
  }

  async findAll(
    query: FilterProductsDto,
  ): Promise<{ data: Product[]; total: Number }> {
    const {
      limit,
      page,
      farmerId,
      title,
      category,
      isOrganic,
      seasonalTag,
      status,
      region,
    } = query;

    const filter: Record<string, any> = {};

    if (farmerId) {
      filter.farmerId = farmerId;
    }

    if (title) {
      filter.title = new RegExp(title, 'i');
    }

    if (category) {
      filter.category = category;
    }

    if (typeof isOrganic === 'boolean') {
      filter.isOrganic = isOrganic;
    }

    if (seasonalTag) {
      filter.seasonalTag = seasonalTag;
    }

    if (status) {
      filter.status = status;
    }

    if (region) {
      filter.region = region;
    }

    return this.productRepository.findAll(filter, page, limit);
  }

  async statusCount(){
    return await this.productRepository.statusCount()
  }

  async findOne(id: string): Promise<Product> {
    return this.productRepository.findOneById(id);
  }

  async findBySlug(slug: string): Promise<Product> {
    return this.productRepository.findOneBySlug(slug);
  }

  async update(slug: string, payload: UpdateProductDto): Promise<Product> {
    return this.productRepository.update(slug, payload);
  }

  async remove(slug: string): Promise<Product> {
    return this.productRepository.remove(slug);
  }
}
