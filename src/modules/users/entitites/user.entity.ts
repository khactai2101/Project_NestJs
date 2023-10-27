import { RoleEntity } from 'src/modules/role/entities/role.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @Column()
  password: string;

  @Column()
  avatar: string;

  @Column()
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;

  @ManyToOne(() => RoleEntity, (role) => role.item)
  @JoinColumn([
    {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  ])
  role: RoleEntity;
}
