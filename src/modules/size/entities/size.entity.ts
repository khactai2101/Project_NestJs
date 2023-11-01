import { CartEntity } from 'src/modules/cart/entities/cart.entity';
import { ProductSizeEntity } from 'src/modules/product/entities/productSize.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Sizes')
export class SizeEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  size: string;

  @Column()
  percent: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;

  @OneToMany(() => ProductSizeEntity, (productSize) => productSize.sizes)
  productSizes: ProductSizeEntity[];

  @OneToMany(() => CartEntity, (cart) => cart.size)
  carts: CartEntity[];
}
