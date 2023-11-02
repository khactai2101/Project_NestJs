import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { OrderItemDto } from './dto/orderItem.dto';
import { OrderItemEntity } from './entities/orderItem.entity';
import { CartEntity } from '../cart/entities/cart.entity';
import { OrderEntity } from './entities/order.entity';
import { IOrder } from './interface/orderItem.interface';

@Injectable()
export class OrderRepository {
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
  async updateStatusOrder(id: number, data: IOrder): Promise<any> {
    return await this.orderRepository.update(id, data);
  }

  // async deleteOrderItem(id: number): Promise<DeleteResult> {
  //   const deleteOrderItem = await this.OrderItemRepository.delete(id);
  //   return deleteOrderItem;
  // }
}
