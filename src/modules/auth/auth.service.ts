import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { GlobalInterface } from '../../shared/interfaces/global.interface';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  async registerService(req: RegisterDto): Promise<GlobalInterface> {
    const hashPassword = (password: string) =>
      bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const user = {
      ...req,
      password: hashPassword(req.password),
    };
    const existingUser = await this.authRepository.registerRepository({
      registerDto: user,
    });
    if (existingUser === true) {
      return {
        success: true,
        message: 'Registration successful',
      };
    }
    return {
      success: false,
      message: 'Email Already Exists!',
    };
  }

  async loginService(req: LoginDto) {
    return await this.authRepository.loginRepository(req);
  }

  async loginGoogleService(req: any) {
    return await this.authRepository.loginGoogleRepository(req.user);
  }
}
