import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Carts')
export class CartEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  productId: number;

  @Column()
  sizeId: number;

  @Column()
  userId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;

  // @OneToMany(() => ProductEntity, (product) => product.brand)
  // product: ProductEntity[];
}
