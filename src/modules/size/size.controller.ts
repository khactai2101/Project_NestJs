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
import { SizeDto } from './dto/size.dto';
import { ISize } from './interface/size.interface';
import { SizeService } from './size.service';

require('dotenv').config();
const initLink = process.env.initLink;

@Controller(initLink + '/sizes')
@UseGuards(CheckAuthenGuard)
@UseGuards(CheckAuthorGuard)
export class SizeController {
  constructor(public sizeService: SizeService) {}

  @Post('/')
  async createSize(@Body() SizeData: SizeDto): Promise<ISize> {
    return await this.sizeService.createSize(SizeData);
  }
  @Get('/')
  async getAllSize(): Promise<ISize[]> {
    return await this.sizeService.getAllSizeService();
  }

  @Get('/:id')
  async getSizeById(@Param('id') id: number): Promise<any> {
    return await this.sizeService.getSizeById(id);
  }

  @Put('/:id')
  async updateSize(
    @Param('id') id: number,
    @Body() SizeData: ISize,
  ): Promise<ISize> {
    return await this.sizeService.updateSizeService(id, SizeData);
  }
  @Delete('/:id')
  async deleteSize(@Param('id') id: number): Promise<GlobalInterface> {
    return await this.sizeService.deleteSize(id);
  }
}
