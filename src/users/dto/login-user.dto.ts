import { IsString, IsEmail, IsNotEmpty, IsEnum } from 'class-validator';
export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
