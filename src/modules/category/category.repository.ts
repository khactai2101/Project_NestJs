import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { CategoryDto } from './dto/category.dto';
import { CategoryEntity } from './entities/category.entity';
import { ICategory } from './interface/category.interface';
import { ISearch } from 'src/shared/interfaces/global.interface';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}
  async createCategory(data: CategoryDto) {
    const newCategory = this.categoryRepository.create(data);
    await this.categoryRepository.save(newCategory);
    return newCategory;
  }
  async findAllCategory(data: ISearch): Promise<CategoryEntity[]> {
    console.log(data);

    return this.categoryRepository.find({
      where: data.data && { category: ILike(`%${data.data}%`) },
    });
  }
  async findOnlyCategory(id: number): Promise<ICategory> {
    const Category = await this.categoryRepository.findOne({
      where: { id: id },
    });
    return Category;
  }

  async updateCategory(id: number, data: ICategory): Promise<any> {
    const updateCategory = await this.categoryRepository.update(id, data);
    return updateCategory;
  }
  async deleteCategory(id: number): Promise<DeleteResult> {
    const deleteCategory = await this.categoryRepository.delete(id);
    return deleteCategory;
  }
}
