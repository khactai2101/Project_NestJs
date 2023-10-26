import { Body, Injectable, Param } from '@nestjs/common';
import { IRoles } from './interface/role.interface';
import { Role } from './entities/role.entity';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {
  constructor(private roleRepository: RoleRepository) {}
  async createRole(@Body() data: IRoles): Promise<Role> {
    const newRole = await this.roleRepository.createRole(data);
    return newRole;
  }
  async getAllRole(): Promise<IRoles[]> {
    return this.roleRepository.findAll();
  }
  // async getRoleById(@Param() id: number): Promise<IRoles | string> {
  //   const role = await this.roleRepository.findOnly(id);
  //   if (!role) {
  //     return 'Id not found.';
  //   }
  //   return role;
  // }
}
