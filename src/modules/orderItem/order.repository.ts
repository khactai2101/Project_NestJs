import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { OrderItemDto } from './dto/orderItem.dto';
import { OrderItemEntity } from './entities/orderItem.entity';
import { CartEntity } from '../cart/entities/cart.entity';
import { OrderEntity } from './entities/order.entity';
import { IOrder } from './interface/orderItem.interface';
import { ProductEntity } from '../product/entities/product.entity';
import { log } from 'console';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(OrderItemEntity)
    private orderItemRepository: Repository<OrderItemEntity>,

    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,

    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}
  async findCartByUser(userId: number) {
    return await this.cartRepository.find({
      where: { userId },
    });
  }

  async createOrderItem(orderItem: any) {
    const data = {
      codeOrder: orderItem.codeOrder,
      productId: orderItem.productId,
      sizeId: orderItem.sizeId,
      quantity: orderItem.quantity,
    };
    await this.orderRepository.create(data);
    await this.orderItemRepository.create(orderItem);
    return await this.orderItemRepository.save(orderItem);
  }

  async createOrder(order: any) {
    return await this.orderRepository.save(order);
  }
  async updateStockProduct(id: number, quantity: number) {
    const productItem = await this.productRepository.findOneBy({ id });
    await this.productRepository.update(id, {
      stock: productItem.stock - quantity,
    });
  }
  async deleteCartByUser(id: number) {
    await this.cartRepository.delete(id);
  }

  async findAllOrder(userId: number): Promise<any> {
    const data = await this.orderRepository.find({
      where: { userId },
      relations: ['address', 'orderItems'],
    });

    return data;
  }
  // async findAllOrder(userId: number): Promise<any> {
  //   return this.orderRepository.find({
  //     where: { userId },
  //     relations: ['address', 'orderItems'],
  //   });
  // }
  async findAllOrderByAdmin(): Promise<any> {
    return this.orderRepository.find();
  }
  async updateStatusOrder(id: number, data: IOrder): Promise<any> {
    return await this.orderRepository.update(id, data);
  }
}
