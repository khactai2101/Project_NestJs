// import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { BrandEntity } from 'src/modules/brand/entities/brand.entity';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { ImageEntity } from 'src/modules/image/entities/image.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductSizeEntity } from './productSize.entity';
import { SizeEntity } from 'src/modules/size/entities/size.entity';
import { CartEntity } from 'src/modules/cart/entities/cart.entity';
import { OrderItemEntity } from 'src/modules/orderItem/entities/orderItem.entity';

@Entity('Products')
export class ProductEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @Column({ default: 1 })
  status: number;

  @Column()
  categoryId: number;

  @Column()
  brandId: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    select: false,
  })
  createAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    select: false,
  })
  updateAt: Date;

  @ManyToOne(() => BrandEntity, (brand) => brand.product, { eager: true })
  brand: BrandEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.product, {
    eager: true,
  })
  category: CategoryEntity;

  @OneToMany(() => ImageEntity, (image) => image.product, { eager: true })
  images: ImageEntity[];

  @OneToMany(() => ProductSizeEntity, (productSize) => productSize.products)
  productSizes: ProductSizeEntity[];

  @OneToMany(() => CartEntity, (cart) => cart.product)
  carts: CartEntity[];

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.product)
  orderItems: OrderItemEntity[];

  @ManyToMany(() => SizeEntity)
  @JoinTable({ name: 'ProductSizes' })
  size: SizeEntity[];
}
