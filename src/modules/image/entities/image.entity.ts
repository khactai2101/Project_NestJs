import { ProductEntity } from 'src/modules/product/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Images')
export class ImageEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  src: string;

  @Column()
  productId: number;

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

  @ManyToOne(() => ProductEntity, (product) => product.images)
  product: ProductEntity;
}
