import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleService } from './role.service';
import { RoleRepository } from './role.repository';
import { RoleController } from './role.controller';
import { RoleEntity } from './entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  controllers: [RoleController],
  providers: [RoleService, RoleRepository],
})
export class RoleModule {}
