import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { JwtGuard } from './jwt.guard';

@Module({
  imports: [],
  providers: [JwtStrategy, JwtService, JwtGuard],
})
export class SecurityModule {}
