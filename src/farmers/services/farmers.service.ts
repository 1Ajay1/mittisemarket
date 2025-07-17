import { Injectable } from '@nestjs/common';
import { FarmerRepository } from '../repositories/farmers.repository';
import { CreateFarmerDto, UpdateFarmerDto } from '../dto';
import { Farmer } from '../entities';

@Injectable()
export class FarmersService {
  constructor(private readonly farmerRepository: FarmerRepository) {}
  async create(payload: CreateFarmerDto): Promise<Farmer> {
    return await this.farmerRepository.create(payload);
  }

  async findAll(): Promise<Farmer[]> {
    return await this.farmerRepository.findAll();
  }

  async findOne(id: string): Promise<Farmer> {
    return await this.farmerRepository.findOne(id);
  }

  async update(id: string, payload: UpdateFarmerDto): Promise<Farmer> {
    return await this.farmerRepository.update(id, payload);
  }

  async remove(id: string): Promise<Farmer> {
    return await this.farmerRepository.remove(id);
  }
}
