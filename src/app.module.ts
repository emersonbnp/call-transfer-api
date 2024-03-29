import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CallModule } from './calls/call.module';
import { SecurityModule } from './security/jwt.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGODB_HOST}`,
    ),
    CallModule,
    SecurityModule,
  ],
})
export class AppModule {}
