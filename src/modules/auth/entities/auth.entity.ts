import { Exclude } from 'class-transformer';
import { AddressEntity } from 'src/modules/address/entities/address.entity';
import { RoleEntity } from 'src/modules/role/entities/role.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Users')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({
    default:
      'https://phongreviews.com/wp-content/uploads/2022/11/avatar-facebook-mac-dinh-8.jpg',
  })
  avatar: string;

  @Column({ default: 1 })
  status: number;

  @Column({ nullable: false, default: 1 })
  roleId: number;

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

  @ManyToOne(() => RoleEntity, (role) => role.users)
  role: RoleEntity;

  @OneToMany(() => AddressEntity, (address) => address.user)
  addresses: AddressEntity[];
}
