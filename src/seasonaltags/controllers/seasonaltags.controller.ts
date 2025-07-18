import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SeasonaltagsService } from '../services/seasonaltags.service';
import { CreateSeasonaltagDto, UpdateSeasonaltagDto } from '../dto';
import { Seasonaltag } from '../entities';

@Controller('seasonaltags')
export class SeasonaltagsController {
  constructor(private readonly seasonaltagsService: SeasonaltagsService) {}

  @Post()
  async create(@Body() payload: CreateSeasonaltagDto): Promise<Seasonaltag> {
    return await this.seasonaltagsService.create(payload);
  }

  @Get()
  async findAll(): Promise<Seasonaltag[]> {
    return await this.seasonaltagsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Seasonaltag> {
    return await this.seasonaltagsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() payload: UpdateSeasonaltagDto,
  ): Promise<Seasonaltag> {
    return await this.seasonaltagsService.update(id, payload);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Seasonaltag> {
    return await this.seasonaltagsService.remove(id);
  }

  @Get('check-slug')
  async checkSlug(
    @Query('slug') slug: string,
    @Query('id') id?: string,
  ): Promise<{ message: string; isAvailable: boolean }> {
    slug = slug.trim();
    const isAvailable = await this.seasonaltagsService.checkSlugAvailability(
      slug,
      id,
    );

    if (isAvailable) {
      return {
        message: `Slug '${slug}' is available and can be used.`,
        isAvailable: true,
      };
    } else {
      return { message: `Slug '${slug}' already exists.`, isAvailable: false };
    }
  }
}
