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
import { OrderItemService } from './orderItem.service';
import { OrderItemDto } from './dto/orderItem.dto';

require('dotenv').config();
const initLink = process.env.initLink;

@Controller(initLink + '/order')
@UseGuards(CheckAuthenGuard)
export class OrderItemController {
  constructor(
    public orderItemService: OrderItemService,
    private sharedDataService: SharedDataService,
  ) {}

  @Post('/')
  async createOrderItem(): Promise<any> {
    const currentToken = this.sharedDataService.getCurrentToken();
    const userId = currentToken.token.id;
    return await this.orderItemService.createOrderItem(userId);
  }
  @Get('/me')
  async getAllOrder(): Promise<any> {
    const currentToken = this.sharedDataService.getCurrentToken();
    const userId = currentToken.token.id;
    return await this.orderItemService.getAllOrderService(userId);
  }
  @Get('/')
  @UseGuards(CheckAuthenGuard)
  @UseGuards(CheckAuthorGuard)
  async getAllOrderByAdmin(): Promise<any> {
    return await this.orderItemService.getAllOrderByAdminService();
  }

  // @Put('/:id')
  // async updateOrderItem(
  //   @Param('id') id: number,
  //   @Body() OrderItemData: IOrderItem,
  // ): Promise<IOrderItem> {
  //   return await this.orderItemService.updateOrderItemService(
  //     id,
  //     OrderItemData,
  //   );
  // }
  // @Delete('/:id')
  // async deleteOrderItem(@Param('id') id: number): Promise<GlobalInterface> {
  //   return await this.orderItemService.deleteOrderItem(id);
  // }
}
