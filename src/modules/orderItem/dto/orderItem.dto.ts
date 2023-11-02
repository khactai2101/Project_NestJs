import { IsNotEmpty } from 'class-validator';

export class OrderItemDto {
  @IsNotEmpty()
  codeOrder: number;

  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  sizeId: number;

  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  quantity: number;
}
