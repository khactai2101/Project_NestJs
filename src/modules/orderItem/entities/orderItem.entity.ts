import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { SizeEntity } from 'src/modules/size/entities/size.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('OrderItems')
export class OrderItemEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  codeOrder: number;

  @Column()
  productId: number;

  @Column()
  sizeId: number;

  @Column()
  quantity: number;

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
  @ManyToOne(() => OrderEntity, (order) => order.orderItems)
  @JoinColumn({ name: 'codeOrder', referencedColumnName: 'codeOrder' })
  order: OrderEntity;

  // @OneToMany(() => ProductEntity, (product) => product.brand)
  // product: ProductEntity[];

  @ManyToOne(() => ProductEntity, (product) => product.orderItems, {
    eager: true,
  })
  product: ProductEntity;

  // @ManyToOne(() => ProductEntity, (product) => product.carts)
  // product: ProductEntity;
}
