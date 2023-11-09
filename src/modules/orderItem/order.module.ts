import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenerateToken } from 'src/shared/middlewares/generateToken';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';
import { OrderItemEntity } from './entities/orderItem.entity';
import { CartEntity } from '../cart/entities/cart.entity';
import { OrderEntity } from './entities/order.entity';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';
import { OrderController } from './order.controller';
import { ProductEntity } from '../product/entities/product.entity';
import { SizeEntity } from '../size/entities/size.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderItemEntity,
      CartEntity,
      OrderEntity,
      ProductEntity,
    ]),
  ],
  providers: [OrderService, OrderRepository, GenerateToken, SharedDataService],
  controllers: [OrderController],
})
export class OrderModule {}
