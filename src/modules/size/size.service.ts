import { Injectable } from '@nestjs/common';
import { ISize } from './interface/size.interface';
import { LoginDto } from '../auth/dto/login.dto';
import { log } from 'console';
import { GlobalInterface } from 'src/shared/interfaces/global.interface';
import { SizeDto } from './dto/size.dto';
import { SizeEntity } from './entities/size.entity';
import { SizeRepository } from './size.repository';

@Injectable()
export class SizeService {
  constructor(private sizeRepository: SizeRepository) {}
  async createSize(data: SizeDto): Promise<SizeEntity> {
    return await this.sizeRepository.createSize(data);
  }
  async getAllSizeService(): Promise<ISize[]> {
    return await this.sizeRepository.findAllSize();
  }
  async getSizeById(id: number): Promise<any> {
    const Size = await this.sizeRepository.findOnlySize(id);
    if (!Size) {
      return {
        success: false,
        message: 'Id not found',
      };
    }
    return Size;
  }
  async updateSizeService(id: number, data: ISize): Promise<ISize> {
    return await this.sizeRepository.updateSize(id, data);
  }
  async deleteSize(id: number): Promise<GlobalInterface> {
    const req = await this.sizeRepository.deleteSize(id);
    if (req.affected === 1) {
      return {
        success: true,
        message: 'Size deleted successfully',
      };
    }
  }
}
