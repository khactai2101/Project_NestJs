import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { CloudinaryService } from '../../shared/ultis/uploadClodinary/cloudinary.service';
import { ImageEntity } from '../image/entities/image.entity';
import { GenerateToken } from 'src/shared/middlewares/generateToken';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';
import { SizeEntity } from '../size/entities/size.entity';
import { ProductSizeEntity } from './entities/productSize.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, ImageEntity, ProductSizeEntity]),
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductRepository,
    CloudinaryService,
    GenerateToken,
    SharedDataService,
  ],
})
export class ProductModule {}
