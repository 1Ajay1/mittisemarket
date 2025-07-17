import { Injectable } from '@nestjs/common';
import { CreateRegionDto } from '../dto/create-region.dto';
import { UpdateRegionDto } from '../dto/update-region.dto';
import { RegionRepository } from '../repositories/region.repositories';
import { Region } from '../entities';

@Injectable()
export class RegionService {
  constructor(private readonly regionRepository: RegionRepository) {}
  async create(payload: CreateRegionDto): Promise<Region> {
    return await this.regionRepository.create(payload);
  }

  async findAll(): Promise<Region[]> {
    return await this.regionRepository.findAll();
  }

  async getAllRegionNames(
  isDomestic?: boolean,
): Promise<Pick<Region, 'name'>[]> {
  const filter: Partial<Record<'isActive' | 'isDomestic', boolean>> = {
    isActive: true,
  };

  if (isDomestic !== undefined) {
    filter.isDomestic = isDomestic;
  }

  return this.regionRepository.getAllRegionNames(filter);
}

  async findOne(id: string): Promise<Region> {
    return await this.regionRepository.findOneById(id);
  }

  async findOneBySlug(slug: string): Promise<Region> {
    return await this.regionRepository.findOneBySlug(slug);
  }

  async update(slug: string, payload: UpdateRegionDto): Promise<Region> {
    return await this.regionRepository.update(slug, payload);
  }

  async remove(slug: string): Promise<Region> {
    return await this.regionRepository.remove(slug);
  }
}
