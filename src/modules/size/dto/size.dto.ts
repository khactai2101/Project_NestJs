import { IsNotEmpty } from 'class-validator';

export class SizeDto {
  @IsNotEmpty()
  size: string;

  @IsNotEmpty()
  percent: number;
}
