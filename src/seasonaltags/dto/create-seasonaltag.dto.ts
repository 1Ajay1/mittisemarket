import { Transform } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateSeasonaltagDto {

    @IsNotEmpty()
      @IsString()
      name: string;
    
      @IsOptional()
      @IsString()
      description?: string;
    
      @IsNotEmpty()
      @IsString()
      slug: string;
}
