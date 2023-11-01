import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { SizeEntity } from './entities/size.entity';
import { SizeDto } from './dto/size.dto';
import { ISize } from './interface/size.interface';

@Injectable()
export class SizeRepository {
  constructor(
    @InjectRepository(SizeEntity)
    private sizeRepository: Repository<SizeEntity>,
  ) {}
  async createSize(data: SizeDto) {
    await this.sizeRepository.create(data);
    return await this.sizeRepository.save(data);
  }
  async findAllSize(): Promise<SizeEntity[]> {
    return this.sizeRepository.find();
  }
  async findOnlySize(id: number): Promise<ISize> {
    const Size = await this.sizeRepository.findOne({
      where: { id: id },
    });
    return Size;
  }

  async updateSize(id: number, data: ISize): Promise<any> {
    const updateSize = await this.sizeRepository.update(id, data);
    return updateSize;
  }
  async deleteSize(id: number): Promise<DeleteResult> {
    const deleteSize = await this.sizeRepository.delete(id);
    return deleteSize;
  }
}
