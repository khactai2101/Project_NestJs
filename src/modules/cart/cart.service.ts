import { Injectable } from '@nestjs/common';
import { ICart } from './interface/cart.interface';
import { LoginDto } from '../auth/dto/login.dto';
import { CartDto } from './dto/cart.dto';
import { CartEntity } from './entities/cart.entity';
import { GlobalInterface } from 'src/shared/interfaces/global.interface';
import { CartRepository } from './cart.repository';

@Injectable()
export class CartService {
  constructor(private cartRepository: CartRepository) {}
  async createCart(data: any): Promise<any> {
    return await this.cartRepository.createCart(data);
  }
  async getAllCartService(userId: number): Promise<any> {
    return await this.cartRepository.findAllCart(userId);
  }

  async updateCartService(id: number, data: ICart): Promise<ICart> {
    return await this.cartRepository.updateCart(id, data);
  }
  async deleteCart(id: number): Promise<GlobalInterface> {
    const req = await this.cartRepository.deleteCart(id);
    if (req.affected === 1) {
      return {
        success: true,
        message: 'Cart deleted successfully',
      };
    }
  }
}
