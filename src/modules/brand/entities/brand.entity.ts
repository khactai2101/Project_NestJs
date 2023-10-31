import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Brands')
export class BrandEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ unique: true })
  name: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;
}
