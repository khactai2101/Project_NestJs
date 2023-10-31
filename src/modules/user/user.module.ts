import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserEntity } from '../auth/entities/auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenerateToken } from 'src/shared/middlewares/generateToken';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';
import { CloudinaryModule } from '../../shared/ultis/uploadClodinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), CloudinaryModule],
  providers: [UserService, UserRepository, GenerateToken, SharedDataService],

  controllers: [UserController],
})
export class UserModule {}
