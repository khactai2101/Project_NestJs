import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';
import { AddressService } from './address.service';
import { AddressRepository } from './address.repository';
import { AddressController } from './address.controller';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';
import { GenerateToken } from 'src/shared/middlewares/generateToken';

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity])],
  providers: [
    AddressService,
    AddressRepository,
    SharedDataService,
    GenerateToken,
  ],

  controllers: [AddressController],
})
export class AddressModule {}
