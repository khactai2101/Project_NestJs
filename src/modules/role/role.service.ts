import { Body, Injectable, Param } from '@nestjs/common';
import { IRoles } from './interface/role.interface';
import { Role } from './entities/Role';
import { RoleRepository } from './role.repository';
import { RoleDto } from './dto/role.dto';
import { DeleteResult } from 'typeorm';
import { GlobalInterface } from 'src/shared/interfaces/global.interface';

@Injectable()
export class RoleService {
  constructor(private roleRepository: RoleRepository) {}
  async createRole(data: RoleDto): Promise<Role> {
    const newRole = await this.roleRepository.createRole(data);
    return newRole;
  }
  async getAllRole(): Promise<IRoles[]> {
    return await this.roleRepository.findAllRole();
  }
  async getRoleById(id: number): Promise<IRoles | string> {
    const role = await this.roleRepository.findOnlyRole(id);
    if (!role) {
      return 'Id not found.';
    }
    return role;
  }
  async updateRole(id: number, data: RoleDto): Promise<any> {
    return await this.roleRepository.updateRole(id, data);
  }
  async deleteRole(id: number): Promise<GlobalInterface> {
    const req = await this.roleRepository.deleteRole(id);
    if (req.affected === 1) {
      return {
        success: true,
        message: 'Role deleted successfully',
      };
    }
  }
}
