import { CartEntity } from 'src/modules/cart/entities/cart.entity';
import { FavoriteEntity } from 'src/modules/favorite/entities/favorite.entity';
import { OrderItemEntity } from 'src/modules/orderItem/entities/orderItem.entity';
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

  @OneToMany(() => ProductSizeEntity, (productSize) => productSize.sizes, {
    cascade: true,
  })
  productSizes: ProductSizeEntity[];

  @OneToMany(() => CartEntity, (cart) => cart.size)
  carts: CartEntity[];

  // @OneToMany(() => FavoriteEntity, (favorite) => favorite.size)
  // favorites: FavoriteEntity[];

  @OneToMany(() => FavoriteEntity, (favorite) => favorite.size)
  favorites: FavoriteEntity[];

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.size)
  orderItems: OrderItemEntity[];

  // @OneToMany(() => FavoriteEntity, (favorite) => favorite.size)
  // favorites: FavoriteEntity[];
}
