import {
  IsBoolean,
  IsOptional,
  IsString,
  IsNotEmpty,
  Matches,
} from 'class-validator';

export class CreateRegionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'slug must be kebab-case (lowercase with hyphens)',
  })
  slug: string;

  @IsOptional()
  @IsBoolean()
  isDomestic?: boolean;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Z]{2}$/, {
    message:
      'countryCode must be a valid ISO 3166-1 alpha-2 code (e.g. IN, US)',
  })
  countryCode: string;
}
