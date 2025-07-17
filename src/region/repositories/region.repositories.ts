import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Region, RegionDocument } from '../entities';
import { CreateRegionDto, UpdateRegionDto } from '../dto';

@Injectable()
export class RegionRepository {
  constructor(
    @InjectModel(Region.name)
    private readonly regionModel: Model<RegionDocument>,
  ) {}

  async create(payload: CreateRegionDto): Promise<Region> {
    return await this.regionModel.create(payload);
  }

  async findAll(): Promise<Region[]> {
    return await this.regionModel.find();
  }

  async getAllRegionNames(filter): Promise<Pick<Region, 'name'>[]> {
    return this.regionModel.find(filter, { name: 1 }).lean().exec();
  }

  async findOneById(id: string): Promise<Region> {
    const region = await this.regionModel.findById(id).lean().exec();
    if (!region) {
      throw new NotFoundException(`Region not found with ID ${id}`);
    }
    return region;
  }

  async findOneBySlug(slug: string): Promise<Region> {
    const region = await this.regionModel.findOne({ slug }).lean().exec();
    if (!region) {
      throw new NotFoundException(`Region not found with slug: '${slug}'`);
    }
    return region;
  }

  async update(slug: string, payload: UpdateRegionDto): Promise<Region> {
    const updatedRegion = await this.regionModel
      .findOneAndUpdate({ slug }, payload, { new: true })
      .lean()
      .exec();

    if (!updatedRegion) {
      throw new NotFoundException(`Region not found with slug: ${slug}`);
    }

    return updatedRegion;
  }

  async remove(slug: string): Promise<Region> {
    const deletedRegion = await this.regionModel
      .findOneAndDelete({ slug })
      .lean()
      .exec();

    if (!deletedRegion) {
      throw new NotFoundException(`Region not found with slug: ${slug}`);
    }

    return deletedRegion;
  }
}
