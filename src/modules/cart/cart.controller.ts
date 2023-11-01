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
import { SharedDataService } from 'src/shared/middlewares/shareData.service';

require('dotenv').config();
const initLink = process.env.initLink;

@Controller(initLink + '/carts')
@UseGuards(CheckAuthenGuard)
export class CartController {
  constructor(
    public cartService: CartService,
    private sharedDataService: SharedDataService,
  ) {}

  @Post('/')
  async createCart(@Body() cartData: CartDto): Promise<any> {
    const currentToken = this.sharedDataService.getCurrentToken();
    const userId = currentToken.token.id;
    const data = {
      ...cartData,
      userId,
    };
    return await this.cartService.createCart(data);
  }
  @Get('/me')
  async getAllCart(): Promise<any> {
    const currentToken = this.sharedDataService.getCurrentToken();
    const userId = currentToken.token.id;

    return await this.cartService.getAllCartService(userId);
  }

  @Put('/:id')
  async updateCart(
    @Param('id') id: number,
    @Body() CartData: ICart,
  ): Promise<ICart> {
    return await this.cartService.updateCartService(id, CartData);
  }
  @Delete('/:id')
  async deleteCart(@Param('id') id: number): Promise<GlobalInterface> {
    return await this.cartService.deleteCart(id);
  }
}
