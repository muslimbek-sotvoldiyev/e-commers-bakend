import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
  IsJSON,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  category_id: number;

  @IsOptional()
  sizes?: any;

  @IsOptional()
  colors?: any;

  @IsOptional()
  photos?: any;
}
