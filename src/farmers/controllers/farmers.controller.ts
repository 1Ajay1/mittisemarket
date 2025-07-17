import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { FarmersService } from '../services/farmers.service';
import { CreateFarmerDto, UpdateFarmerDto } from '../dto';
import { Farmer } from '../entities';

@Controller('farmers')
export class FarmersController {
  constructor(private readonly farmersService: FarmersService) {}

  @Post()
  async create(@Body() createFarmerDto: CreateFarmerDto): Promise<Farmer> {
    return await this.farmersService.create(createFarmerDto);
  }

  @Get()
  async findAll(): Promise<Farmer[]> {
    return await this.farmersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Farmer> {
    return await this.farmersService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFarmerDto: UpdateFarmerDto,
  ): Promise<Farmer> {
    return await this.farmersService.update(id, updateFarmerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Farmer> {
    return await this.farmersService.remove(id);
  }
}
