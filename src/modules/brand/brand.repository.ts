import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { BrandDto } from './dto/brand.dto';
import { BrandEntity } from './entities/brand.entity';
import { IBrand } from './interface/brand.interface';
import { ISearch } from 'src/shared/interfaces/global.interface';

@Injectable()
export class BrandRepository {
  constructor(
    @InjectRepository(BrandEntity)
    private brandRepository: Repository<BrandEntity>,
  ) {}
  async createBrand(data: BrandDto) {
    const newBrand = this.brandRepository.create(data);
    await this.brandRepository.save(newBrand);
    return newBrand;
  }
  async findAllBrand(data: ISearch): Promise<BrandEntity[]> {
    return this.brandRepository.find({
      where: data.data && { name: ILike(`%${data.data}%`) },
    });
  }
  async findOnlyBrand(id: number): Promise<IBrand> {
    const brand = await this.brandRepository.findOne({ where: { id: id } });
    return brand;
  }

  async updateBrand(id: number, data: IBrand): Promise<any> {
    const updateBrand = await this.brandRepository.update(id, data);
    return updateBrand;
  }
  async deleteBrand(id: number): Promise<DeleteResult> {
    const deleteBrand = await this.brandRepository.delete(id);
    return deleteBrand;
  }
}
