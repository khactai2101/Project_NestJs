import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { CartService } from './cart.service';
import { CartRepository } from './cart.repository';
import { CartController } from './cart.controller';
import { GenerateToken } from 'src/shared/middlewares/generateToken';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity])],
  providers: [CartService, CartRepository, GenerateToken, SharedDataService],
  controllers: [CartController],
})
export class CartModule {}
