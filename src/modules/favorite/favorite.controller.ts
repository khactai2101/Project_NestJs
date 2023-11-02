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
import { CheckAuthenGuard } from 'src/shared/guards/auth.guard';
import { CheckAuthorGuard } from 'src/shared/guards/role.guard';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';
import { FavoriteDto } from './dto/favorite.dto';
import { FavoriteService } from './favorite.service';

require('dotenv').config();
const initLink = process.env.initLink;

@Controller(initLink + '/favorites')
@UseGuards(CheckAuthenGuard)
export class FavoriteController {
  constructor(
    public favoriteService: FavoriteService,
    private sharedDataService: SharedDataService,
  ) {}

  @Post('/')
  async createFavorite(@Body() favoriteData: FavoriteDto): Promise<any> {
    const currentToken = this.sharedDataService.getCurrentToken();
    const userId = currentToken.token.id;

    const data = {
      ...favoriteData,
      userId,
    };
    return await this.favoriteService.createFavorite(data);
  }
  @Get('/me')
  async getAllFavorite(): Promise<any> {
    const currentToken = this.sharedDataService.getCurrentToken();
    const userId = currentToken.token.id;

    return await this.favoriteService.getAllFavoriteService(userId);
  }

  @Delete('/:id')
  async deleteFavorite(@Param('id') id: number): Promise<GlobalInterface> {
    return await this.favoriteService.deleteFavorite(id);
  }
}
