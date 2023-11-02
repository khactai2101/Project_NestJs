import { Injectable } from '@nestjs/common';
import { LoginDto } from '../auth/dto/login.dto';
import { OrderItemDto } from './dto/orderItem.dto';
import { OrderItemEntity } from './entities/orderItem.entity';
import { GlobalInterface } from 'src/shared/interfaces/global.interface';
import { OrderItemRepository } from './orderItem.repository';

@Injectable()
export class OrderItemService {
  constructor(private orderItemRepository: OrderItemRepository) {}
  async createOrderItem(userId: number): Promise<any> {
    const res = await this.orderItemRepository.findCartByUser(userId);
    const min = 1000000;
    const max = 9999999;
    const codeOrder = Math.floor(Math.random() * (max - min + 1)) + min;
    const orderItem = res?.map((item) => ({
      codeOrder,
      productId: item.productId,
      sizeId: item.sizeId,
      quantity: item.quantity,
    }));
    for (const item of orderItem) {
      await this.orderItemRepository.createOrderItem(item);
    }
    const order = {
      codeOrder,
      addressId: 1,
      paymentId: 1,
      userId,
    };

    return await this.orderItemRepository.createOrder(order);
  }
  async getAllOrderService(userId: number): Promise<any> {
    return await this.orderItemRepository.findAllOrder(userId);
  }
  async getAllOrderByAdminService(): Promise<any> {
    return await this.orderItemRepository.findAllOrderByAdmin();
  }

  // async updateOrderItemService(
  //   id: number,
  //   data: IOrderItem,
  // ): Promise<IOrderItem> {
  //   return await this.OrderItemRepository.updateOrderItem(id, data);
  // }
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
