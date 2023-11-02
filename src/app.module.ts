import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MysqlModule } from './modules/database/config.database';
import { LoggerMiddleware } from './modules/role/middlewares/logger.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';
import { UserModule } from './modules/user/user.module';
import { BrandModule } from './modules/brand/brand.module';
import { AddressModule } from './modules/address/address.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { SizeModule } from './modules/size/size.module';
import { CartModule } from './modules/cart/cart.module';
import { OrderItemModule } from './modules/orderItem/orderItem.module';

@Module({
  imports: [
    MysqlModule,
    RoleModule,
    AuthModule,
    UserModule,
    BrandModule,
    AddressModule,
    CategoryModule,
    ProductModule,
    SizeModule,
    CartModule,
    OrderItemModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('role');
  }
}
