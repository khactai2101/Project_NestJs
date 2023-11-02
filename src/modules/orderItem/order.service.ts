import { Injectable } from '@nestjs/common';
import { LoginDto } from '../auth/dto/login.dto';
import { OrderItemDto } from './dto/orderItem.dto';
import { OrderItemEntity } from './entities/orderItem.entity';
import { GlobalInterface } from 'src/shared/interfaces/global.interface';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository) {}
  async createOrderItem(userId: number): Promise<any> {
    const res = await this.orderRepository.findCartByUser(userId);
    const min = 1000000;
    const max = 9999999;
    const codeOrder = Math.floor(Math.random() * (max - min + 1)) + min;
    const order = {
      codeOrder,
      addressId: 1,
      paymentId: 1,
      userId,
    };

    const resOrder = await this.orderRepository.createOrder(order);
    const orderItem = res?.map((item) => ({
      cartId: item.id,
      codeOrder,
      productId: item.productId,
      sizeId: item.sizeId,
      quantity: item.quantity,
    }));
    for (const item of orderItem) {
      await this.orderRepository.createOrderItem(item);
      await this.orderRepository.deleteCartByUser(item.cartId);
      await this.orderRepository.updateStockProduct(
        item.productId,
        item.quantity,
      );
    }
    return resOrder;
  }
  async getAllOrderService(userId: number): Promise<any> {
    return await this.orderRepository.findAllOrder(userId);
  }
  async getAllOrderByAdminService(): Promise<any> {
    return await this.orderRepository.findAllOrderByAdmin();
  }

  async updateStatusOrderService(id: number, data: any) {
    return await this.orderRepository.updateStatusOrder(id, data);
  }
  // async deleteOrderItem(id: number): Promise<GlobalInterface> {
  //   const req = await this.OrderItemRepository.deleteOrderItem(id);
  //   if (req.affected === 1) {
  //     return {
  //       success: true,
  //       message: 'OrderItem deleted successfully',
  //     };
  //   }
  // }
}
