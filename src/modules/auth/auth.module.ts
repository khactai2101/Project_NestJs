import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/auth.entity';
import { GenerateToken } from 'src/shared/middlewares/generateToken';
import { SocketGateway } from 'src/socket';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, AuthRepository])],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, GenerateToken, SocketGateway],
})
export class AuthModule {}
