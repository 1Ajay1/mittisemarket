import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Farmer, FarmerDocument } from '../entities';
import { Model } from 'mongoose';
import { CreateFarmerDto, UpdateFarmerDto } from '../dto';

@Injectable()
export class FarmerRepository {
  constructor(
    @InjectModel(Farmer.name)
    private readonly farmerModel: Model<FarmerDocument>,
  ) {}

  private commonPopulate() {
    return [
      {
        path: 'stateInfo',
        select: 'name',
      },
    ];
  }

  async create(payload: CreateFarmerDto): Promise<Farmer> {
    return await this.farmerModel.create(payload);
  }

  async findAll() {
    return await this.farmerModel
      .find()
      .populate(this.commonPopulate())
      .lean()
      .exec();
  }

  async findOne(id: string) {
    const farmer = await this.farmerModel
      .findById(id)
      .populate(this.commonPopulate())
      .exec();
    if (!farmer) {
      throw new NotFoundException(`Farmer with id ${id} not found`);
    }
    return farmer;
  }

  async update(id: string, payload: UpdateFarmerDto) {
    const farmer = await this.farmerModel.findByIdAndUpdate(id, payload, {
      new: true,
    });
    if (!farmer) {
      throw new NotFoundException(`Farmer is not found with the ${id}`);
    }
    return farmer;
  }

  async remove(id: string): Promise<Farmer> {
    const farmer = await this.farmerModel.findByIdAndDelete(id);
    if (!farmer) {
      throw new NotFoundException(`Farmer is not found with the ${id}`);
    }
    return farmer;
  }
}
