// import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { UserEntity } from 'src/modules/auth/entities/auth.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Role')
export class RoleEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true, nullable: true })
  role: number;

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

  @OneToMany(() => UserEntity, (user) => user.role)
  users: UserEntity[];
}
