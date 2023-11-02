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
import { CheckAuthenGuard } from 'src/shared/guards/auth.guard';
import { CheckAuthorGuard } from 'src/shared/guards/role.guard';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';
import { OrderService } from './order.service';
import { OrderItemDto } from './dto/orderItem.dto';

require('dotenv').config();
const initLink = process.env.initLink;

@Controller(initLink + '/order')
@UseGuards(CheckAuthenGuard)
export class OrderController {
  constructor(
    public orderService: OrderService,
    private sharedDataService: SharedDataService,
  ) {}

  @Post('/')
  async createOrderItem(): Promise<any> {
    const currentToken = this.sharedDataService.getCurrentToken();
    const userId = currentToken.token.id;
    return await this.orderService.createOrderItem(userId);
  }
  @Get('/me')
  async getAllOrder(): Promise<any> {
    const currentToken = this.sharedDataService.getCurrentToken();
    const userId = currentToken.token.id;
    return await this.orderService.getAllOrderService(userId);
  }
  @Get('/')
  @UseGuards(CheckAuthenGuard)
  @UseGuards(CheckAuthorGuard)
  async getAllOrderByAdmin(): Promise<any> {
    return await this.orderService.getAllOrderByAdminService();
  }

  @Put('/:id')
  async updateOrderItem(@Param('id') id: number, @Body() statusOrderItem: any) {
    return await this.orderService.updateStatusOrderService(
      id,
      statusOrderItem,
    );
  }
  // @Delete('/:id')
  // async deleteOrderItem(@Param('id') id: number): Promise<GlobalInterface> {
  //   return await this.orderItemService.deleteOrderItem(id);
  // }
}
