import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { SizeEntity } from 'src/modules/size/entities/size.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Favorites')
export class FavoriteEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  productId: number;

  @Column()
  sizeId: number;

  @Column()
  userId: number;

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

  // @ManyToOne(() => SizeEntity, (size) => size.favorites)
  // size: SizeEntity;

  @ManyToOne(() => ProductEntity, (product) => product.favorites)
  product: ProductEntity;

  // @ManyToOne(() => SizeEntity, (size) => size.favorites)
  // size: SizeEntity;
  @ManyToOne(() => SizeEntity, (size) => size.favorites, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  size: SizeEntity;
}
