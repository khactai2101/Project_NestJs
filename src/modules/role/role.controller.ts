import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IRoles } from './interface/role.interface';
import { RoleService } from './role.service';

require('dotenv').config();
const initLink = process.env.initLink;
console.log(initLink);

@Controller('/role')
export class RoleController {
  constructor(public roleService: RoleService) {}

  @Post('/')
  async createRole(@Body() roleData: IRoles): Promise<IRoles> {
    return this.roleService.createRole(roleData);
  }
  @Get('/')
  async getAllRole(): Promise<IRoles[]> {
    return this.roleService.getAllRole();
  }
  @Get('/:id')
  async getRoleById(@Param() param): Promise<any> {
    console.log(param);
    const id = param.id;
    // console.log(id);
    console.log('sadsadd');

    // return this.roleService.getRoleById(id);
  }
}
