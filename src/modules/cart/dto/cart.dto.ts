import { IsNotEmpty } from 'class-validator';

export class CartDto {
  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  sizeId: number;

  @IsNotEmpty()
  quantity: number;
}
