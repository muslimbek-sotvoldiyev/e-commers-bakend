import { IsInt, IsOptional, Min } from 'class-validator';

export class CreateCartItemDto {
  @IsInt()
  productId: number;

  @IsInt()
  @IsOptional()
  userId?: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  quantity?: number = 1;
}
