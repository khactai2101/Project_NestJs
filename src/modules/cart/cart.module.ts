import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { CartService } from './cart.service';
import { CartRepository } from './cart.repository';
import { CartController } from './cart.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity])],
  providers: [CartService, CartRepository],
  controllers: [CartController],
})
export class CartModule {}
