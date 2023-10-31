import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from './interface/user.interface';
import { LoginDto } from '../auth/dto/login.dto';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';
import { CheckAuthenGuard } from 'src/shared/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../uploadClodinary/cloudinary.service';

require('dotenv').config();
const initLink = process.env.initLink;
console.log(initLink);

@Controller(initLink + '/user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(
    public userService: UserService,
    private sharedDataService: SharedDataService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Get('/')
  async getAllUser(): Promise<IUser[]> {
    return await this.userService.getAllUser();
  }
  @Get('/:id')
  async getUserById(@Param('id') id: number): Promise<any> {
    return await this.userService.getUserById(id);
  }

  @Put('/update')
  @UseGuards(CheckAuthenGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  async updateUser(
    @UploadedFile() file: Express.Multer.File,
    @Body() userData: IUser,
  ) {
    const response = await this.cloudinaryService.uploadSingleFile(file);
    const user = this.sharedDataService.getCurrentToken();
    const userId = user.token.id;
    const body = {
      ...userData,
      avatar: response.url,
    };
    return await this.userService.updateUserService(userId, body);
  }

  // @Put('/:id')
  // async deleteRole(@Param('id') id: number): Promise<GlobalInterface> {
  //   return await this.roleService.deleteRole(id);
  // }
}
