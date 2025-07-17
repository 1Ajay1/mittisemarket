import { Module } from '@nestjs/common';
import { SeasonaltagRepository } from './repositories/seasonaltags.repository';
import { SeasonaltagsController } from './controllers/seasonaltags.controller';
import { SeasonaltagsService } from './services/seasonaltags.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Seasonaltag, SeasonaltagSchema } from './entities';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Seasonaltag.name, schema: SeasonaltagSchema },
    ]),
  ],
  controllers: [SeasonaltagsController],
  providers: [SeasonaltagsService, SeasonaltagRepository],
})
export class SeasonaltagsModule {}
