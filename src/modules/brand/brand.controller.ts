import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GlobalInterface } from 'src/shared/interfaces/global.interface';
import { BrandService } from '../brand/brand.service';
import { BrandDto } from '../brand/dto/brand.dto';
import { IBrand } from './interface/brand.interface';
import { CheckAuthenGuard } from 'src/shared/guards/auth.guard';
import { CheckAuthorGuard } from 'src/shared/guards/role.guard';

require('dotenv').config();
const initLink = process.env.initLink;

@Controller(initLink + '/brands')
@UseGuards(CheckAuthenGuard)
@UseGuards(CheckAuthorGuard)
export class BrandController {
  constructor(public brandService: BrandService) {}

  @Post('/')
  async createbrand(@Body() brandData: BrandDto): Promise<IBrand> {
    return await this.brandService.createBrand(brandData);
  }
  @Get('/')
  async getAllbrand(@Query() data): Promise<IBrand[]> {
    return await this.brandService.getAllBrandService(data);
  }
  @Get('/:id')
  async getbrandById(@Param('id') id: number): Promise<any> {
    return await this.brandService.getBrandById(id);
  }

  @Put('/:id')
  async updatebrand(
    @Param('id') id: number,
    @Body() brandData: IBrand,
  ): Promise<IBrand> {
    return await this.brandService.updateBrandService(id, brandData);
  }
  @Delete('/:id')
  async deletebrand(@Param('id') id: number): Promise<GlobalInterface> {
    return await this.brandService.deleteBrand(id);
  }
}
