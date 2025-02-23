import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateCardInfoDto {
  @IsString()
  number: string;

  @IsString()
  date: string;

  @IsString()
  @Length(3, 3)
  @IsOptional()
  cvv: string;

  @IsString()
  full_name: string;
}
