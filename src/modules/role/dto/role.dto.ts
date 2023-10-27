import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class RoleDto {
  @IsNotEmpty()
  @IsNumber()
  role: number;
}
