import { Module } from '@nestjs/common';
import { FarmersController } from './controllers/farmers.controller';
import { FarmersService } from './services/farmers.service';
import { FarmerRepository } from './repositories/farmers.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Farmer, FarmerSchema } from './entities';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Farmer.name, schema: FarmerSchema }]),
  ],
  controllers: [FarmersController],
  providers: [FarmersService, FarmerRepository],
})
export class FarmersModule {}
