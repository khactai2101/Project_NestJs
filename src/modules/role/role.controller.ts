import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IRoles } from './interface/role.interface';
import { RoleService } from './role.service';
import { RoleDto } from './dto/role.dto';
import { DeleteResult } from 'typeorm';
import { GlobalInterface } from 'src/shared/interfaces/global.interface';

require('dotenv').config();
const initLink = process.env.initLink;

@Controller(initLink + '/role')
export class RoleController {
  constructor(public roleService: RoleService) {}

  @Post('/')
  async createRole(@Body() roleData: RoleDto): Promise<IRoles> {
    return await this.roleService.createRole(roleData);
  }
  @Get('/')
  async getAllRole(): Promise<IRoles[]> {
    return await this.roleService.getAllRole();
  }
  @Get('/:id')
  async getRoleById(@Param() param): Promise<string | IRoles> {
    const id = +param.id;
    return await this.roleService.getRoleById(id);
  }

  @Put('/:id')
  async updateRole(
    @Param('id') id: number,
    @Body() roleData: RoleDto,
  ): Promise<IRoles> {
    return await this.roleService.updateRole(id, roleData);
  }
  @Delete('/:id')
  async deleteRole(@Param('id') id: number): Promise<GlobalInterface> {
    return await this.roleService.deleteRole(id);
  }
}
