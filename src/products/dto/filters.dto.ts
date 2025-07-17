import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  IsNumber,
  MaxLength,
} from 'class-validator';
import { Types } from 'mongoose';
import {
  ProductCategory,
  ProductStatus,
  SeasonalTag,
} from '../enum/products.enum';
import { Region } from 'src/common/common.emum';

export class FilterProductsDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  title?: string;

  @IsOptional()
  @Transform(({ value }) => new Types.ObjectId(value))
  farmerId?: Types.ObjectId;

  @IsOptional()
  @IsEnum(ProductCategory, {
    message: `category must be one of: ${Object.values(ProductCategory).join(', ')}`,
  })
  category?: ProductCategory;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (typeof value === 'boolean') return value;

    if (typeof value === 'string') {
      const val = value.trim().toLowerCase();
      if (val === 'true') return true;
      if (val === 'false') return false;
    }

    return undefined;
  })
  isOrganic?: boolean;

  @IsOptional()
  @IsEnum(SeasonalTag, {
    message: `seasonalTag must be one of: ${Object.values(SeasonalTag).join(', ')}`,
  })
  seasonalTag?: SeasonalTag;

  @IsOptional()
  @IsEnum(ProductStatus, {
    message: `status must be one of: ${Object.values(ProductStatus).join(', ')}`,
  })
  status?: ProductStatus;

  @IsOptional()
  @IsEnum(Region, {
    message: `region must be one of: ${Object.values(Region).join(', ')}`,
  })
  region?: Region;
}
