import { IsNumber, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  @IsOptional()
  cardInfoId: number;

  @IsNumber()
  long: number;

  @IsNumber()
  lat: number;

  @IsOptional()
  description: string;
}
