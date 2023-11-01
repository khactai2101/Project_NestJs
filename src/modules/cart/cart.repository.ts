import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CartDto } from './dto/cart.dto';
import { CartEntity } from './entities/cart.entity';
import { ICart } from './interface/cart.interface';

@Injectable()
export class CartRepository {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
  ) {}
  async createCart(data: CartDto) {
    const newCart = this.cartRepository.create(data);
    return await this.cartRepository.save(newCart);
  }
  // async findAllCart(): Promise<CartEntity[]> {
  //   return this.cartRepository.find();
  // }
  // async findOnlyCart(id: number): Promise<ICart> {
  //   const Cart = await this.cartRepository.findOne({ where: { id: id } });
  //   return Cart;
  // }

  // async updateCart(id: number, data: ICart): Promise<any> {
  //   const updateCart = await this.cartRepository.update(id, data);
  //   return updateCart;
  // }
  // async deleteCart(id: number): Promise<DeleteResult> {
  //   const deleteCart = await this.cartRepository.delete(id);
  //   return deleteCart;
  // }
}
