import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Seasonaltag, SeasonaltagDocument } from '../entities';
import { Model } from 'mongoose';
import { CreateSeasonaltagDto, UpdateSeasonaltagDto } from '../dto';

@Injectable()
export class SeasonaltagRepository {
  constructor(
    @InjectModel(Seasonaltag.name)
    private readonly seasonaltagModel: Model<SeasonaltagDocument>,
  ) {}

  async create(payload: CreateSeasonaltagDto): Promise<Seasonaltag> {
    return await this.seasonaltagModel.create(payload);
  }

  async findAll(): Promise<Seasonaltag[]> {
    return await this.seasonaltagModel.find().exec();
  }

  async findOne(id: string): Promise<Seasonaltag> {
    const result = await this.seasonaltagModel.findById(id).exec();
    if (!result) {
      throw new NotFoundException(`Seasonaltag with id ${id} not found`);
    }
    return result;
  }

  async update(id: string, payload: UpdateSeasonaltagDto): Promise<Seasonaltag> {
    const result = await this.seasonaltagModel.findByIdAndUpdate(id, payload, {
      new: true,
    });
    if (!result) {
      throw new NotFoundException(`Seasonaltag is not found with the ${id}`);
    }
    return result;
  }

  async remove(id: string): Promise<Seasonaltag> {
    const result = await this.seasonaltagModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`Seasonaltag is not found with the ${id}`);
    }
    return result;
  }
}
