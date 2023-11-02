import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenerateToken } from 'src/shared/middlewares/generateToken';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';
import { OrderItemEntity } from './entities/orderItem.entity';
import { OrderItemService } from './orderItem.service';
import { OrderItemRepository } from './orderItem.repository';
import { OrderItemController } from './orderItem.controller';
import { CartEntity } from '../cart/entities/cart.entity';
import { OrderEntity } from './entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderItemEntity, CartEntity, OrderEntity]),
  ],
  providers: [
    OrderItemService,
    OrderItemRepository,
    GenerateToken,
    SharedDataService,
  ],
  controllers: [OrderItemController],
})
export class OrderItemModule {}
