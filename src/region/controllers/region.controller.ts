import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { RegionService } from '../services/region.service';
import { CreateRegionDto, UpdateRegionDto } from '../dto';
import { Region } from '../entities';

@Controller('regions')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Post()
  async create(@Body() createRegionDto: CreateRegionDto): Promise<Region> {
    return await this.regionService.create(createRegionDto);
  }

  @Get()
  async findAll(): Promise<Region[]> {
    return await this.regionService.findAll();
  }

  @Get('name')
  async getAllRegionNames(
    @Query('isDomestic') isDomestic?: string,
  ): Promise<Pick<Region, 'name'>[]> {
    const isDomesticBool =
      isDomestic?.toLowerCase() === 'true'
        ? true
        : isDomestic?.toLowerCase() === 'false'
          ? false
          : undefined;

    return this.regionService.getAllRegionNames(isDomesticBool);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Region> {
    return await this.regionService.findOne(id);
  }

  @Post(':slug')
  async findOneBySlug(@Param('slug') slug: string): Promise<Region> {
    return await this.regionService.findOneBySlug(slug);
  }

  @Put(':slug')
  async update(
    @Param('slug') slug: string,
    @Body() Payload: UpdateRegionDto,
  ): Promise<Region> {
    return await this.regionService.update(slug, Payload);
  }

  @Delete(':slug')
  async remove(@Param('slug') slug: string): Promise<Region> {
    return await this.regionService.remove(slug);
  }
}
