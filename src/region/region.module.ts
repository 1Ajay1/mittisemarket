import { Module } from '@nestjs/common';
import { RegionService } from './services/region.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Region, RegionSchema } from './entities';
import { RegionRepository } from './repositories/region.repositories';
import { RegionController } from './controllers/region.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Region.name,
        schema: RegionSchema,
      },
    ]),
  ],
  controllers: [RegionController],
  providers: [RegionService, RegionRepository],
})
export class RegionModule {}
