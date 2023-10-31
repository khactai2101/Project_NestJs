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
import { CategoryService } from './category.service';
import { BrandService } from '../brand/brand.service';
import { CategoryDto } from './dto/category.dto';
import { ICategory } from './interface/category.interface';
import { CheckAuthenGuard } from 'src/shared/guards/auth.guard';
import { CheckAuthorGuard } from 'src/shared/guards/role.guard';

require('dotenv').config();
const initLink = process.env.initLink;

@Controller(initLink + '/categories')
@UseGuards(CheckAuthenGuard)
@UseGuards(CheckAuthorGuard)
export class CategoryController {
  constructor(public categoryService: CategoryService) {}

  @Post('/')
  async createCategory(@Body() categoryData: CategoryDto): Promise<ICategory> {
    return await this.categoryService.createCategory(categoryData);
  }
  @Get('/')
  async getAllCategory(): Promise<ICategory[]> {
    return await this.categoryService.getAllCategoryService();
  }

  @Get('/:id')
  async getCategoryById(@Param('id') id: number): Promise<any> {
    return await this.categoryService.getCategoryById(id);
  }

  @Put('/:id')
  async updateCategory(
    @Param('id') id: number,
    @Body() CategoryData: ICategory,
  ): Promise<ICategory> {
    return await this.categoryService.updateCategoryService(id, CategoryData);
  }
  @Delete('/:id')
  async deleteCategory(@Param('id') id: number): Promise<GlobalInterface> {
    return await this.categoryService.deleteCategory(id);
  }
}
