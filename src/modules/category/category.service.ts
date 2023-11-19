import { Injectable } from '@nestjs/common';
import { ICategory } from './interface/category.interface';
import { LoginDto } from '../auth/dto/login.dto';
import { CategoryDto } from './dto/category.dto';
import { CategoryEntity } from './entities/category.entity';
import { log } from 'console';
import {
  GlobalInterface,
  ISearch,
} from 'src/shared/interfaces/global.interface';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}
  async createCategory(data: CategoryDto): Promise<CategoryEntity> {
    const newCategory = await this.categoryRepository.createCategory(data);
    return newCategory;
  }
  async getAllCategoryService(data: ISearch): Promise<ICategory[]> {
    return await this.categoryRepository.findAllCategory(data);
  }
  async getCategoryById(id: number): Promise<any> {
    const Category = await this.categoryRepository.findOnlyCategory(id);
    if (!Category) {
      return {
        success: false,
        message: 'Id not found',
      };
    }
    return Category;
  }
  async updateCategoryService(id: number, data: ICategory): Promise<ICategory> {
    return await this.categoryRepository.updateCategory(id, data);
  }
  async deleteCategory(id: number): Promise<GlobalInterface> {
    const req = await this.categoryRepository.deleteCategory(id);
    if (req.affected === 1) {
      return {
        success: true,
        message: 'Category deleted successfully',
      };
    }
  }
}
