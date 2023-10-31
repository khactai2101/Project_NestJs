import { Injectable } from '@nestjs/common';
import { LoginDto } from '../auth/dto/login.dto';
import { log } from 'console';
import { GlobalInterface } from 'src/shared/interfaces/global.interface';
import { AddressDto } from './dto/address.dto';
import { AddressEntity } from './entities/address.entity';
import { AddressRepository } from './address.repository';
import { IAddress } from './interface/address.interface';

@Injectable()
export class AddressService {
  constructor(private addressRepository: AddressRepository) {}
  async createAddress(data: AddressDto): Promise<GlobalInterface> {
    const newAddress = await this.addressRepository.createAddress(data);
    if (newAddress) {
      return {
        success: true,
        message: 'Created address successfully',
      };
    }
    return {
      success: false,
      message: 'address created failed',
    };
  }
  async getAllAddressService(): Promise<IAddress[]> {
    return await this.addressRepository.findAllAddress();
  }

  async updateAddressService(id: number, data: IAddress): Promise<IAddress> {
    return await this.addressRepository.updateAddress(id, data);
  }
  async deleteAddress(id: number): Promise<GlobalInterface> {
    const req = await this.addressRepository.deleteAddress(id);
    if (req.affected === 1) {
      return {
        success: true,
        message: 'Address deleted successfully',
      };
    }
  }
}
