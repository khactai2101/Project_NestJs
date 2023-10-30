import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();
const jwtService = new JwtService({
  secretOrPrivateKey: process.env.JWT_SECRET_KEY,
});

export class GenerateToken {
  signJwt(payload: any, jwtSignOptions?: JwtSignOptions) {
    console.log(payload, '<<<');
    return jwtService.sign(payload, jwtSignOptions);
  }
}
