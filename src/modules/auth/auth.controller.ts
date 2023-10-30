import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { GlobalInterface } from '../../shared/interfaces/global.interface';
import { LoginDto } from './dto/login.dto';

require('dotenv').config();
const initLink = process.env.initLink;
@Controller(initLink + '/auth')
export class AuthController {
  constructor(public authService: AuthService) {}
  @Post('/register')
  async register(
    @Body() registerDtoController: RegisterDto,
  ): Promise<GlobalInterface> {
    return await this.authService.registerService(registerDtoController);
  }
  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<any> {
    return await this.authService.loginService(loginDto);
  }
}
