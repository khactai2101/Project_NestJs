import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { IUser } from './interface/user.interface';
import { LoginDto } from '../auth/dto/login.dto';

@Injectable()
export class UserService {
  constructor(private UserRepository: UserRepository) {}

  async getAllUser(): Promise<IUser[]> {
    return await this.UserRepository.findAllUser();
  }
  async getUserById(id: number): Promise<any> {
    console.log(id);

    const User = await this.UserRepository.findOnlyUser(id);
    if (!User) {
      return 'Id not found.';
    }
    return User;
  }
  async updateUserService(id: number, data: IUser): Promise<IUser> {
    return await this.UserRepository.updateUser(id, data);
  }
  //   async deleteUser(id: number): Promise<GlobalInterface> {
  //     const req = await this.UserRepository.deleteUser(id);
  //     if (req.affected === 1) {
  //       return {
  //         success: true,
  //         message: 'User deleted successfully',
  //       };
  //     }
  //   }
}
