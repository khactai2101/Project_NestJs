import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';
import { SizeEntity } from 'src/modules/size/entities/size.entity';

@Entity('ProductSizes')
export class ProductSizeEntity {
  @PrimaryColumn()
  productsId: number;

  @PrimaryColumn()
  sizesId: number;

  @ManyToOne(() => ProductEntity, (product) => product.productSizes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  products: ProductEntity;

  @ManyToOne(() => SizeEntity, (size) => size.productSizes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  sizes: SizeEntity;

  //   @ManyToOne(() => CategoryEntity, (category) => category.product)
  //   category: CategoryEntity;

  //   @OneToMany(() => ImageEntity, (image) => image.product)
  //   images: ImageEntity[];
}
