import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from './interface/user.interface';
import { LoginDto } from '../auth/dto/login.dto';

require('dotenv').config();
const initLink = process.env.initLink;
console.log(initLink);

@Controller(initLink + '/user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(public userService: UserService) {}

  @Get('/')
  async getAllUser(): Promise<IUser[]> {
    return await this.userService.getAllUser();
  }
  @Get('/:id')
  async getUserById(@Param('id') id: number): Promise<any> {
    return await this.userService.getUserById(id);
  }

  @Put('/update ')
  async updateUser(
    @Param('id') id: number,
    @Body() userData: IUser,
  ): Promise<IUser> {
    return await this.userService.updateUserService(id, userData);
  }
  // @Put('/:id')
  // async deleteRole(@Param('id') id: number): Promise<GlobalInterface> {
  //   return await this.roleService.deleteRole(id);
  // }
}
