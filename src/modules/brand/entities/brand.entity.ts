import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Brands')
export class BrandEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ unique: true })
  name: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;

  @OneToMany(() => ProductEntity, (product) => product.brand)
  product: ProductEntity[];
}
