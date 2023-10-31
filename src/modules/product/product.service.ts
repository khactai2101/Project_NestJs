import { Body, Injectable, Param } from '@nestjs/common';
import { ProductDto, ProductStatusDto } from './dto/product.dto';
import { ProductRepository } from './product.repository';
import { IProducts } from './interface/product.interface';
import { GlobalInterface } from 'src/shared/interfaces/global.interface';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}
  async createProduct(data: ProductDto, dataImage: string[]): Promise<any> {
    const newProduct = await this.productRepository.createProduct(data);
    if (newProduct) {
      const imageArray = dataImage?.map((item) => ({
        productId: newProduct.id,
        src: item,
      }));
      for (const img of imageArray) {
        await this.productRepository.createImage(img);
      }
    }
  }
  async getAllProduct(): Promise<IProducts[]> {
    return await this.productRepository.findAllProduct();
  }
  async getProductById(id: number): Promise<IProducts | string> {
    const product = await this.productRepository.findOnlyProduct(id);
    if (!product) {
      return 'Id not found.';
    }
    return product;
  }
  async updateProduct(id: number, data: ProductDto): Promise<IProducts> {
    return await this.productRepository.updateProduct(id, data);
  }
  async updateImageProduct(id: number, file): Promise<IProducts> {
    return await this.productRepository.updateImageProduct(id, file);
  }
  async blockProductService(
    id: number,
    data: ProductStatusDto,
  ): Promise<IProducts> {
    return await this.productRepository.blockProduct(id, data);
  }
  async deleteProduct(id: number): Promise<GlobalInterface> {
    const req = await this.productRepository.deleteProduct(id);
    if (req.affected === 1) {
      return {
        success: true,
        message: 'Product deleted successfully',
      };
    }
  }
}
