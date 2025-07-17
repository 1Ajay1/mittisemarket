import { Injectable } from '@nestjs/common';
import { CreateSeasonaltagDto, UpdateSeasonaltagDto } from '../dto';
import { SeasonaltagRepository } from '../repositories/seasonaltags.repository';
import { Seasonaltag } from '../entities';

@Injectable()
export class SeasonaltagsService {
  constructor(private readonly seasonaltagRepository: SeasonaltagRepository) {}
  async create(payload: CreateSeasonaltagDto): Promise<Seasonaltag> {
    return await this.seasonaltagRepository.create(payload);
  }

  async findAll(): Promise<Seasonaltag[]> {
    return await this.seasonaltagRepository.findAll();
  }

  async findOne(id: string): Promise<Seasonaltag> {
    return await this.seasonaltagRepository.findOne(id);
  }

  async update(
    id: string,
    payload: UpdateSeasonaltagDto,
  ): Promise<Seasonaltag> {
    return await this.seasonaltagRepository.update(id, payload);
  }

  async remove(id: string): Promise<Seasonaltag> {
    return await this.seasonaltagRepository.remove(id);
  }
}
