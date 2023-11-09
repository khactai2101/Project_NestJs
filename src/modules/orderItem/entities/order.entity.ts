import { AddressEntity } from 'src/modules/address/entities/address.entity';
import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { SizeEntity } from 'src/modules/size/entities/size.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItemEntity } from './orderItem.entity';

@Entity('Orders')
export class OrderEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Index()
  @Column()
  codeOrder: number;

  @Column()
  addressId: number;

  @Column()
  paymentId: number;

  @Column()
  userId: number;

  @Column({ default: 1 })
  status: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;

  @ManyToOne(() => AddressEntity, (address) => address.orders, {
    eager: true,
  })
  address: AddressEntity;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order, {
    eager: true,
  })
  orderItems: OrderItemEntity[];
}
