import { Injectable } from '@nestjs/common';
import { IBrand } from './interface/brand.interface';
import { LoginDto } from '../auth/dto/login.dto';
import { BrandDto } from './dto/brand.dto';
import { BrandEntity } from './entities/brand.entity';
import { BrandRepository } from './brand.repository';
import {
  GlobalInterface,
  ISearch,
} from 'src/shared/interfaces/global.interface';

@Injectable()
export class BrandService {
  constructor(private brandRepository: BrandRepository) {}
  async createBrand(data: BrandDto): Promise<BrandEntity> {
    const newBrand = await this.brandRepository.createBrand(data);
    return newBrand;
  }
  async getAllBrandService(data: ISearch): Promise<IBrand[]> {
    return await this.brandRepository.findAllBrand(data);
  }
  async getBrandById(id: number): Promise<any> {
    const brand = await this.brandRepository.findOnlyBrand(id);
    if (!brand) {
      return {
        success: false,
        message: 'Id not found',
      };
    }
    return brand;
  }
  async updateBrandService(id: number, data: IBrand): Promise<IBrand> {
    return await this.brandRepository.updateBrand(id, data);
  }
  async deleteBrand(id: number): Promise<GlobalInterface> {
    const req = await this.brandRepository.deleteBrand(id);
    if (req.affected === 1) {
      return {
        success: true,
        message: 'Brand deleted successfully',
      };
    }
  }
}
