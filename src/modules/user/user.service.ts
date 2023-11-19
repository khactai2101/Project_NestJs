import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { IUser } from './interface/user.interface';
import { LoginDto } from '../auth/dto/login.dto';
import {
  GlobalInterface,
  ISearch,
} from 'src/shared/interfaces/global.interface';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAllUser(data: ISearch): Promise<IUser[]> {
    return await this.userRepository.findAllUser(data);
  }
  async getOneUserService(id: number) {
    return await this.userRepository.findOnlyUser(id);
  }
  async updateUserService(id: number, data: IUser): Promise<GlobalInterface> {
    const req = await this.userRepository.updateUser(id, data);

    if (req.affected === 1) {
      return {
        success: true,
        message: 'Update user successfully',
      };
    }
  }

  async updateStatusService(id: number, body: IUser): Promise<GlobalInterface> {
    const response = await this.userRepository.updateStatus(id, body);
    if (response.affected == 1) {
      return {
        success: true,
        message: 'Change status successfully',
      };
    }
    return {
      success: false,
      message: 'Id User not found',
    };
  }
}
