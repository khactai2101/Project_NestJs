import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MysqlModule } from './modules/database/config.database';
import { LoggerMiddleware } from './modules/role/middlewares/logger.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';
import { UserModule } from './modules/user/user.module';
import { BrandModule } from './modules/brand/brand.module';

@Module({
  imports: [MysqlModule, RoleModule, AuthModule, UserModule, BrandModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('role');
  }
}
