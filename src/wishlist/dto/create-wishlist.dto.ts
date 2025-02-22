import { IsNumber, IsOptional } from 'class-validator';

export class CreateWishlistDto {
  @IsOptional()
  user_id: number;
  @IsNumber()
  product_id: number;
}
