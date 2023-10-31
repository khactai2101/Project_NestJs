import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { ProductDto, ProductStatusDto } from './dto/product.dto';
import { ImageEntity } from '../image/entities/image.entity';
import { IProducts } from './interface/product.interface';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    @InjectRepository(ImageEntity)
    private imageRepository: Repository<ImageEntity>,
  ) {}

  async createProduct(data: ProductDto) {
    const newProduct = this.productRepository.create(data);
    await this.productRepository.save(newProduct);
    return newProduct;
  }
  async createImage(data: any) {
    const newImage = this.imageRepository.create(data);
    await this.imageRepository.save(newImage);
    return newImage;
  }
  async findAllProduct(): Promise<IProducts[]> {
    return this.productRepository.find({
      relations: ['brand', 'category', 'images'],
    });
  }
  async findOnlyProduct(id: number): Promise<any> {
    const product = await this.productRepository.find({
      where: { id: id },
      relations: ['brand', 'category', 'images'],
    });
    return product;
  }

  async updateProduct(id: number, data: ProductDto): Promise<IProducts | any> {
    return await this.productRepository.update(id, data);
  }
  async updateImageProduct(id: number, file): Promise<any> {
    return await this.imageRepository.update(id, { src: file });
  }
  async blockProduct(
    id: number,
    data: ProductStatusDto,
  ): Promise<IProducts | any> {
    return await this.productRepository.update(id, data);
  }
  async deleteProduct(id: number): Promise<DeleteResult> {
    await this.imageRepository.delete({ productId: id });
    return await this.productRepository.delete(id);
  }
}
