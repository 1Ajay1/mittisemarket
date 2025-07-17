import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
  IsArray,
  IsMongoId,
  IsEnum,
  IsUrl,
  Min,
  MaxLength,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { Types } from 'mongoose';
import {
  ProductCategory,
  ProductUnit,
  SeasonalTag,
} from '../enum/products.enum';
import { Region } from 'src/common/common.emum';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  title: string;

  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @IsUrl({}, { each: true })
  images?: string[];

  @IsNotEmpty()
  @Transform(({ value }) => new Types.ObjectId(value))
  farmerId: Types.ObjectId;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  price: number;

  @IsNotEmpty()
  @IsString()
  @IsEnum(ProductUnit, {
    message: `unit must be one of: ${Object.values(ProductUnit).join(', ')}`,
  })
  unit: ProductUnit;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  stock: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @IsEnum(ProductCategory, {
    message: `category must be one of: ${Object.values(ProductCategory).join(', ')}`,
  })
  category: ProductCategory;

  @IsOptional()
  @IsBoolean()
  isOrganic?: boolean;

  @IsOptional()
  @Transform(({ value }) => new Types.ObjectId(value))
  regionId?: Region;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  origin?: string;

  @IsOptional()
  @IsString()
  @IsEnum(SeasonalTag, {
    message: `seasonalTag must be one of: ${Object.values(SeasonalTag).join(', ')}`,
  })
  seasonalTag?: SeasonalTag;
}
