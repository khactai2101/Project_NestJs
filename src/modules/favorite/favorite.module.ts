import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenerateToken } from 'src/shared/middlewares/generateToken';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';
import { FavoriteEntity } from './entities/favorite.entity';
import { FavoriteService } from './favorite.service';
import { FavoriteRepository } from './favorite.repository';
import { FavoriteController } from './favorite.controller';
import { SizeEntity } from '../size/entities/size.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteEntity, SizeEntity])],
  providers: [
    FavoriteService,
    FavoriteRepository,
    GenerateToken,
    SharedDataService,
    SizeEntity,
  ],
  controllers: [FavoriteController],
})
export class FavoriteModule {}
