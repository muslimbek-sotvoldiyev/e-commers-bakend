import { IsString, IsEmail, IsNotEmpty, IsEnum } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  second_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  photo: string;

  @IsEnum(['admin', 'customer'])
  @IsNotEmpty()
  role: string;
}
