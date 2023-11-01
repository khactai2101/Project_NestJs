import { Module } from '@nestjs/common';
import { UserEntity } from '../auth/entities/auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenerateToken } from 'src/shared/middlewares/generateToken';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';
import { SizeEntity } from './entities/size.entity';
import { SizeService } from './size.service';
import { SizeRepository } from './size.repository';
import { SizeController } from './size.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SizeEntity])],
  providers: [SizeService, SizeRepository, GenerateToken, SharedDataService],

  controllers: [SizeController],
})
export class SizeModule {}
