import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { UserEntity } from '../auth/entities/auth.entity';
import { IUser } from './interface/user.interface';
import { LoginDto } from '../auth/dto/login.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAllUser(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
  async findOnlyUser(id: number): Promise<IUser> {
    const User = await this.userRepository.findOne({ where: { id: id } });
    return User;
  }

  async updateUser(id: number, data: IUser): Promise<IUser | any> {
    const updateUser = await this.userRepository.update(id, data);
    return updateUser;
  }
  //   async deleteUser(id: number): Promise<DeleteResult> {
  //     const deleteUser = await this.UserRepository.delete(id);
  //     return deleteUser;
  //   }
}
