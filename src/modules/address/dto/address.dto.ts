import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddressDto {
  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  phoneNumber: number;
}
