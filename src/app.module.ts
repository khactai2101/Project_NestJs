import { Module } from '@nestjs/common';
import { MysqlModule } from './modules/database/config.database';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [MysqlModule],
})
export class AppModule {}
