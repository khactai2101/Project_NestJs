import { Module } from '@nestjs/common';
import { UserEntity } from '../auth/entities/auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryRepository } from './category.repository';
import { GenerateToken } from 'src/shared/middlewares/generateToken';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  providers: [
    CategoryService,
    CategoryRepository,
    GenerateToken,
    SharedDataService,
  ],

  controllers: [CategoryController],
})
export class CategoryModule {}
