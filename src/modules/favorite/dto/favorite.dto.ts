import { IsNotEmpty } from 'class-validator';

export class FavoriteDto {
  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  sizeId: number;
}
