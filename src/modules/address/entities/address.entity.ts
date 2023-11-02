import { UserEntity } from 'src/modules/auth/entities/auth.entity';
import { OrderEntity } from 'src/modules/orderItem/entities/order.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Addresses')
export class AddressEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  address: string;

  @Column()
  phoneNumber: number;

  @Column({
    select: false,
  })
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

  @ManyToOne(() => UserEntity, (user) => user.addresses)
  user: UserEntity;

  @OneToMany(() => OrderEntity, (order) => order.address)
  orders: OrderEntity[];
}
