import { PartialType } from '@nestjs/mapped-types';
import { CreateSeasonaltagDto } from './create-seasonaltag.dto';

export class UpdateSeasonaltagDto extends PartialType(CreateSeasonaltagDto) {}
