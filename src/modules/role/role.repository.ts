import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { IRoles } from './interface/role.interface';

@Injectable()
export class RoleRepository {
  create(data: IRoles) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  async createRole(data: IRoles) {
    const newRole = this.roleRepository.create(data);
    await this.roleRepository.save(newRole);
    console.log('hihihii');

    return newRole;
  }
  async findAll(): Promise<IRoles[]> {
    return this.roleRepository.find();
  }
  // async findOnly(id: number): Promise<IRoles | string> {
  //   const role = await this.roleRepository.findOne({ where: { id: id } });
  //   return role;
  // }
}
