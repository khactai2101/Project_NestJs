import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { AddressEntity } from './entities/address.entity';
import { AddressDto } from './dto/address.dto';
import { IAddress } from './interface/address.interface';

@Injectable()
export class AddressRepository {
  constructor(
    @InjectRepository(AddressEntity)
    private addressRepository: Repository<AddressEntity>,
  ) {}
  async createAddress(data: AddressDto) {
    const newAddress = this.addressRepository.create(data);
    await this.addressRepository.save(newAddress);
    return newAddress;
  }
  async findAllAddress(userId: number): Promise<AddressEntity[]> {
    return this.addressRepository.find({
      where: { userId },
    });
  }

  async updateAddress(id: number, data: IAddress): Promise<any> {
    const updateAddress = await this.addressRepository.update(id, data);
    return updateAddress;
  }
  async deleteAddress(id: number): Promise<DeleteResult> {
    const deleteAddress = await this.addressRepository.delete(id);
    return deleteAddress;
  }
}
