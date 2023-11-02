import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Categories')
export class CategoryEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  category: string;

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

  @OneToMany(() => ProductEntity, (product) => product.category)
  product: ProductEntity[];
}
