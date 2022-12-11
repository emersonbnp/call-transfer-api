import { ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private readonly jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.PUBLIC_KEY.replace(/\\n/g, '\n'),
      algorithms: ['RS256'],
    });
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];

    if (!token) return false;

    const sanitizedToken = this.sanitizeToken(token);
    const publicKey = this.mountPublicKey(process.env.PUBLIC_KEY);

    this.jwtService.verify(sanitizedToken, {
      publicKey,
      algorithms: ['RS256'],
    });

    console.log('validado');

    return true;
  }

  sanitizeToken = (token: string): string =>
    token.replace('Bearer ', '').trim();

  mountPublicKey = (publicKey: string): string =>
    publicKey.replace(/\\n/g, '\n');
}
