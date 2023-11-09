import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { UserEntity } from './entities/auth.entity';
import { RegisterDto } from './dto/register.dto';
import { GenerateToken } from 'src/shared/middlewares/generateToken';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly generateToken: GenerateToken,
  ) {}

  async registerRepository({
    registerDto,
  }: {
    registerDto: RegisterDto;
  }): Promise<boolean> {
    const existingUser = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });
    if (existingUser) {
      return false;
    }
    await this.userRepository.save(registerDto);
    return true;
  }
  async loginRepository(req: LoginDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: req.email },
    });

    if (!existingUser) {
      return false;
    }
    const isExistingUser =
      existingUser && bcrypt.compareSync(req.password, existingUser.password);
    if (isExistingUser) {
      const dataGenerateToken = {
        id: existingUser.id,
        fullName: existingUser.fullName,
        email: existingUser.email,
        avatar: existingUser.avatar,
        status: existingUser.status,
        roleId: existingUser.roleId,
      };
      const accessToken = isExistingUser
        ? this.generateToken.signJwt({ token: dataGenerateToken })
        : null;
      return {
        success: true,
        data: accessToken,
        dataGenerateToken,
      };
    }
    return false;
  }

  async loginGoogleRepository(req: any) {
    console.log(req);

    const existingUser = await this.userRepository.findOne({
      where: { email: req.email },
    });

    if (!existingUser) {
      return false;
    }

    const dataGenerateToken = {
      id: existingUser.id,
      fullName: existingUser.fullName,
      email: existingUser.email,
      avatar: existingUser.avatar,
      status: existingUser.status,
      roleId: existingUser.roleId,
    };
    const accessToken = this.generateToken.signJwt({
      token: dataGenerateToken,
    });

    return {
      success: true,
      data: accessToken,
      dataGenerateToken,
    };
    return false;
  }
}
