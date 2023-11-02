import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { OrderItemDto } from './dto/orderItem.dto';
import { OrderItemEntity } from './entities/orderItem.entity';
import { CartEntity } from '../cart/entities/cart.entity';
import { ICart } from './interface/orderItem.interface';
import { OrderEntity } from './entities/order.entity';
// import { IOrderItem } from './interface/orderItem.interface';

@Injectable()
export class OrderItemRepository {
  constructor(
    @InjectRepository(OrderItemEntity)
    private orderItemRepository: Repository<OrderItemEntity>,

    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,

    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
  ) {}
  async findCartByUser(userId: number) {
    return await this.cartRepository.find({
      where: { userId },
      // relations: ['size', 'product'],
    });
  }

  async createOrderItem(orderItem: any) {
    await this.orderItemRepository.create(orderItem);
    return await this.orderItemRepository.save(orderItem);
  }

  async createOrder(order: any) {
    await this.orderRepository.create(order);
    return await this.orderRepository.save(order);
  }

  async findAllOrder(userId: number): Promise<any> {
    return this.orderRepository.find({
      where: { userId },
      relations: ['address', 'orderItems'],
    });
  }
  async findAllOrderByAdmin(): Promise<any> {
    return this.orderRepository.find();
  }
  // async updateOrderItem(id: number, data: IOrderItem): Promise<any> {
  //   const updateOrderItem = await this.OrderItemRepository.update(id, data);
  //   return updateOrderItem;
  // }
  // async deleteOrderItem(id: number): Promise<DeleteResult> {
  //   const deleteOrderItem = await this.OrderItemRepository.delete(id);
  //   return deleteOrderItem;
  // }
}
