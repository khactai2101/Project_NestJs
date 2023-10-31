import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GenerateToken } from '../middlewares/generateToken';
import { log } from 'util';

@Injectable()
export class CheckAuthorGuard implements CanActivate {
  constructor(private loginService: GenerateToken) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { headers } = request;

    const headerString = headers.authorization.split(' ');

    const currentToken = await this.loginService.verifyJwt(headerString[1]);

    if (currentToken.token.roleId === 2) return true;

    throw new UnauthorizedException('Insufficient role authorization');
  }
}
