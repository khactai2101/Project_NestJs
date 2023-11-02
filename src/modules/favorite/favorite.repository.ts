import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { FavoriteDto } from './dto/favorite.dto';
import { IFavorite } from './interface/favorite.interface';
import { FavoriteEntity } from './entities/favorite.entity';

@Injectable()
export class FavoriteRepository {
  constructor(
    @InjectRepository(FavoriteEntity)
    private favoriteRepository: Repository<FavoriteEntity>,
  ) {}
  async createFavorite(data: any) {
    const newFavorite = this.favoriteRepository.create(data);
    return await this.favoriteRepository.save(newFavorite);
  }
  async findAllFavorite(userId: number): Promise<any> {
    return this.favoriteRepository.find({
      where: { userId },
      relations: ['size', 'product'],
    });
  }

  async deleteFavorite(id: number): Promise<DeleteResult> {
    const deleteFavorite = await this.favoriteRepository.delete(id);
    return deleteFavorite;
  }
}
