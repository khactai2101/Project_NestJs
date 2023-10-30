import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Brands')
export class BrandEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ unique: true })
  name: string;
}
