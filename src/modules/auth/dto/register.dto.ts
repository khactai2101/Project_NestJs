import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  fullName: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @MinLength(8, { message: 'Vui lòng nhập nhiều hơn 8 ký tự' })
  @MaxLength(30, { message: 'Vui lòng nhập ít hơn 30 ký tự' })
  password: string;
}
