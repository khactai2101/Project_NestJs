import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { UserEntity } from '../auth/entities/auth.entity';
import { IUser } from './interface/user.interface';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAllUser(): Promise<UserEntity[]> {
    return this.userRepository.find({ relations: ['role', 'addresses'] });
  }
  async findOnlyUser(id: number): Promise<IUser> {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['role', 'addresses'],
    });
  }

  async updateUser(id: number, data: IUser): Promise<any> {
    return await this.userRepository.update(id, data);
  }
  // async updateStatus(id: number, body: IUser): Promise<any> {
  //   return await this.userRepository.update(id, body);
  // }
}
