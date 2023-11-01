import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductDto, ProductStatusDto } from './dto/product.dto';
import { IProducts } from './interface/product.interface';
import { ProductService } from './product.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../../shared/ultis/uploadClodinary/cloudinary.service';
import { CheckAuthenGuard } from 'src/shared/guards/auth.guard';
import { CheckAuthorGuard } from 'src/shared/guards/role.guard';
import { GlobalInterface } from 'src/shared/interfaces/global.interface';

require('dotenv').config();
const initLink = process.env.initLink;

@Controller(initLink + '/products')
@UseGuards(CheckAuthenGuard)
@UseGuards(CheckAuthorGuard)
export class ProductController {
  constructor(
    public productService: ProductService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Post('/')
  @UseInterceptors(FilesInterceptor('images'))
  async createProduct(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() productData: any,
  ): Promise<any> {
    const data = {
      name: productData.name,
      description: productData.description,
      price: +productData.price,
      stock: +productData.stock,
      categoryId: +productData.categoryId,
      brandId: +productData.brandId,
    };
    const image = await this.cloudinaryService.uploadMultipleFiles(files);
    const dataImage = image.map((item) => {
      return item.url;
    });
    const size = JSON.parse(productData.size);
    return await this.productService.createProduct(data, dataImage, size);
  }
  @Post('/productSize')
  async createProductSize(@Body() data: any): Promise<any> {
    return await this.productService.createProductSize(data);
  }
  @Get('/')
  async getAllProduct(): Promise<IProducts[]> {
    return await this.productService.getAllProduct();
  }
  @Get('/:id')
  async getProductById(@Param() param): Promise<string | IProducts> {
    const id = +param.id;
    return await this.productService.getProductById(id);
  }

  @Put('/:id')
  async updateProduct(
    @Param('id') id: number,
    @Body() ProductData: ProductDto,
  ): Promise<IProducts> {
    return await this.productService.updateProduct(id, ProductData);
  }

  @Put('image/:id')
  @UseInterceptors(FileInterceptor('src'))
  async updateImageProduct(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    const data = await this.cloudinaryService.uploadSingleFile(file);
    return await this.productService.updateImageProduct(id, data?.url);
  }

  @Put('block/:id')
  async blockProduct(
    @Param('id') id: number,
    @Body() productData: ProductStatusDto,
  ): Promise<IProducts> {
    return await this.productService.blockProductService(id, productData);
  }
  @Delete('/:id')
  async deleteProduct(@Param('id') id: number): Promise<GlobalInterface> {
    return await this.productService.deleteProduct(id);
  }
}
