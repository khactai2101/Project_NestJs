import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/Role';
import { DeleteResult, Repository } from 'typeorm';
import { IRoles } from './interface/role.interface';
import { RoleDto } from './dto/role.dto';

@Injectable()
export class RoleRepository {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  async createRole(data: RoleDto) {
    const newRole = this.roleRepository.create(data);
    await this.roleRepository.save(newRole);
    return newRole;
  }
  async findAllRole(): Promise<IRoles[]> {
    return this.roleRepository.find();
  }
  async findOnlyRole(id: number): Promise<IRoles> {
    const role = await this.roleRepository.findOne({ where: { id: id } });
    return role;
  }

  async updateRole(id: number, data: RoleDto): Promise<any> {
    const updateRole = await this.roleRepository.update(id, data);
    return updateRole;
  }
  async deleteRole(id: number): Promise<DeleteResult> {
    const deleteRole = await this.roleRepository.delete(id);
    return deleteRole;
  }
}
