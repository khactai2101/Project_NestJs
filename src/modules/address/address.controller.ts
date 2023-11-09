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
import { AddressDto } from './dto/address.dto';
import { IAddress } from './interface/address.interface';
import { AddressService } from './address.service';
import { CheckAuthenGuard } from 'src/shared/guards/auth.guard';
import { CheckAuthorGuard } from 'src/shared/guards/role.guard';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';
import { log } from 'console';
require('dotenv').config();
const initLink = process.env.initLink;

@Controller(initLink + '/addresses')
export class AddressController {
  constructor(
    public addressService: AddressService,
    private sharedDataService: SharedDataService,
  ) {}

  @Post('/')
  @UseGuards(CheckAuthenGuard)
  async createAddress(@Body() addressData: AddressDto): Promise<any> {
    const currentToken = this.sharedDataService.getCurrentToken();
    const data = {
      ...addressData,
      userId: currentToken.token.id,
    };
    return await this.addressService.createAddress(data);
  }
  @Get('/me')
  @UseGuards(CheckAuthenGuard)
  async getAllAddress(): Promise<any> {
    const currentToken = this.sharedDataService.getCurrentToken();
    const userId = currentToken.token.id;
    return await this.addressService.getAllAddressService(userId);
  }

  @Put('/:id')
  @UseGuards(CheckAuthenGuard)
  async updateAddress(
    @Param('id') id: number,
    @Body() addressData: IAddress,
  ): Promise<IAddress> {
    return await this.addressService.updateAddressService(id, addressData);
  }
  @Delete('/:id')
  @UseGuards(CheckAuthenGuard)
  async deleteAddress(@Param('id') id: number): Promise<GlobalInterface> {
    return await this.addressService.deleteAddress(id);
  }
}
