import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { RegionModule } from './region/region.module';
import { FarmersModule } from './farmers/farmers.module';
import { CategoriesModule } from './categories/categories.module';
import { SeasonalTagModule } from './seasonal-tag/seasonal-tag.module';
import { SeasonaltagsModule } from './seasonaltags/seasonaltags.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/mittisemarket'),
    ProductsModule,
    RegionModule,
    FarmersModule,
    CategoriesModule,
    SeasonalTagModule,
    SeasonaltagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
