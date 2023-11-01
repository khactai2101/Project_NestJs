import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GlobalInterface } from 'src/shared/interfaces/global.interface';
import { ICart } from './interface/cart.interface';
import { CheckAuthenGuard } from 'src/shared/guards/auth.guard';
import { CheckAuthorGuard } from 'src/shared/guards/role.guard';
import { CartService } from './cart.service';
import { CartDto } from './dto/cart.dto';

require('dotenv').config();
const initLink = process.env.initLink;

@Controller(initLink + '/carts')
export class CartController {
  constructor(public cartService: CartService) {}

  @Post('/')
  async createCart(@Body() cartData: CartDto): Promise<any> {
    console.log(cartData);
    return await this.cartService.createCart(cartData);
  }
  // @Get('/')
  // async getAllCart(): Promise<ICart[]> {
  //   return await this.cartService.getAllCartService();
  // }
  // @Get('/:id')
  // async getCartById(@Param('id') id: number): Promise<any> {
  //   return await this.cartService.getCartById(id);
  // }

  // @Put('/:id')
  // async updateCart(
  //   @Param('id') id: number,
  //   @Body() CartData: ICart,
  // ): Promise<ICart> {
  //   return await this.cartService.updateCartService(id, CartData);
  // }
  // @Delete('/:id')
  // async deleteCart(@Param('id') id: number): Promise<GlobalInterface> {
  //   return await this.cartService.deleteCart(id);
  // }
}
