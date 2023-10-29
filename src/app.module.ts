import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MysqlModule } from './modules/database/config.database';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from './modules/role/middlewares/logger.middleware';
// import { UserModule } from './user/user.module';

@Module({
  imports: [MysqlModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('role');
  }
}
