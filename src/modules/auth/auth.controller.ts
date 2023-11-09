import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { GlobalInterface } from '../../shared/interfaces/global.interface';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { SocketGateway } from 'src/socket';

require('dotenv').config();
const initLink = process.env.initLink;
@Controller(initLink + '/auth')
export class AuthController {
  constructor(
    public authService: AuthService,
    @Inject(SocketGateway) private readonly socketGateway: SocketGateway,
  ) {}
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
  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const response = await this.authService.loginGoogleService(req);
    if (response && response.data) {
      const token = response.data;
      return res.redirect(`http://localhost:3000/verifyGoogle/${token}/v1`);
    }
  }
}
