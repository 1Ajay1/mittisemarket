import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  IsEnum,
} from 'class-validator';
import { Types } from 'mongoose';
import { Title } from 'src/common/common.emum';

export class CreateFarmerDto {

    @IsNotEmpty()
  @IsEnum(Title, {
    message: `title must be one of: ${Object.values(Title).join(', ')}`,
  })
  title: Title;
  
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  village?: string;

  @IsOptional()
  @IsString()
  district?: string;

  @IsOptional()
  @Transform(({value})=>new Types.ObjectId(value))
  stateId?: Types.ObjectId;

  @IsOptional()
  @Matches(/^\d{6}$/, { message: 'PIN code must be 6 digits' })
  pinCode?: string;
}
