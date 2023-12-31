import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { ProductDto, ProductStatusDto } from './dto/product.dto';
import { ImageEntity } from '../image/entities/image.entity';
import { IProducts } from './interface/product.interface';
import { ProductSizeEntity } from './entities/productSize.entity';
import { ISearch } from 'src/shared/interfaces/global.interface';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    @InjectRepository(ImageEntity)
    private imageRepository: Repository<ImageEntity>,
    @InjectRepository(ProductSizeEntity)
    private productSizeRepository: Repository<ProductSizeEntity>,
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
  async createProductSizeRepository(data: any) {
    await this.productSizeRepository.create(data);
    return await this.productSizeRepository.save(data);
  }
  async createSize(data: any) {
    await this.productSizeRepository.create(data);
    return await this.productSizeRepository.save(data);
  }

  async findAllProduct(data: ISearch): Promise<any> {
    return this.productRepository.find({
      where: data.data && { name: ILike(`%${data.data}%`) },
      relations: ['brand', 'category', 'images', 'size'],
      order: {
        id: 'DESC',
      },
    });
  }
  async findOnlyProduct(id: number): Promise<any> {
    const product = await this.productRepository.findOne({
      where: { id: id },
      relations: ['brand', 'category', 'images', 'size'],
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
    await this.productSizeRepository.delete({ productsId: id });
    return await this.productRepository.delete(id);
  }

  async deleteProductSize(productsId, sizesId): Promise<any> {
    const options = { productsId: productsId, sizesId: sizesId };
    await this.productSizeRepository.delete(options);
  }
}
