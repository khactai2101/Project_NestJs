import { Injectable } from '@nestjs/common';
import { LoginDto } from '../auth/dto/login.dto';
import { GlobalInterface } from 'src/shared/interfaces/global.interface';
import { FavoriteRepository } from './favorite.repository';

@Injectable()
export class FavoriteService {
  constructor(private favoriteRepository: FavoriteRepository) {}
  async createFavorite(data: any): Promise<any> {
    return await this.favoriteRepository.createFavorite(data);
  }
  async getAllFavoriteService(userId: number): Promise<any> {
    return await this.favoriteRepository.findAllFavorite(userId);
  }

  async deleteFavorite(id: number): Promise<GlobalInterface> {
    const req = await this.favoriteRepository.deleteFavorite(id);
    if (req.affected === 1) {
      return {
        success: true,
        message: 'Favorite deleted successfully',
      };
    }
  }
}
