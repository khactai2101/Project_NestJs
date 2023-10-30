import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandDto } from './dto/brand.dto';
import { IBrand } from './interface/brand.interface';
import { GlobalInterface } from 'src/shared/interfaces/global.interface';

require('dotenv').config();
const initLink = process.env.initLink;

@Controller(initLink + '/brands')
export class BrandController {
  constructor(public brandService: BrandService) {}

  @Post('/')
  async createBrand(@Body() brandData: BrandDto): Promise<IBrand> {
    return await this.brandService.createBrand(brandData);
  }
  @Get('/')
  async getAllBrand(): Promise<IBrand[]> {
    return await this.brandService.getAllBrandService();
  }
  @Get('/:id')
  async getBrandById(@Param('id') id: number): Promise<any> {
    return await this.brandService.getBrandById(id);
  }

  @Put('/:id')
  async updateBrand(
    @Param('id') id: number,
    @Body() BrandData: IBrand,
  ): Promise<IBrand> {
    return await this.brandService.updateBrandService(id, BrandData);
  }
  @Delete('/:id')
  async deleteBrand(@Param('id') id: number): Promise<GlobalInterface> {
    return await this.brandService.deleteBrand(id);
  }
}
