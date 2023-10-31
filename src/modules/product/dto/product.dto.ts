import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class ProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  stock: number;

  @IsNotEmpty()
  categoryId: number;

  @IsNotEmpty()
  brandId: number;
}
export class ProductStatusDto {
  @IsNotEmpty()
  status: number;
}
