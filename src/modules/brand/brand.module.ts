import { Module } from '@nestjs/common';
import { UserEntity } from '../auth/entities/auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandEntity } from './entities/brand.entity';
import { BrandRepository } from './brand.repository';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { GenerateToken } from 'src/shared/middlewares/generateToken';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';

@Module({
  imports: [TypeOrmModule.forFeature([BrandEntity])],
  providers: [BrandService, BrandRepository, GenerateToken, SharedDataService],

  controllers: [BrandController],
})
export class BrandModule {}
