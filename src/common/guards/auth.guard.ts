import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '../config/config.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuardd implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Authorization kaliti berilmagan');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('JWT kaliti topilmadi');
    }

    try {
      const decodedToken = jwt.verify(
        token,
        this.configService.get('JWT_ACCESS_SECRET'),
      ) as jwt.JwtPayload;

      if (!decodedToken.email) {
        throw new UnauthorizedException('Yaroqsiz token');
      }

      const user = await this.userService.FindByEmail(decodedToken.email);
      if (!user) {
        throw new UnauthorizedException('Foydalanuvchi topilmadi');
      }

      request.user = user; // decodedToken emas, balki butun user obyektini qo‘shish yaxshiroq
      return true;
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new UnauthorizedException('Yaroqsiz token');
      }

      if (
        error instanceof UnauthorizedException ||
        error instanceof ForbiddenException
      ) {
        throw error;
      }

      throw new UnauthorizedException('Autentifikatsiya xatosi');
    }
  }
}
