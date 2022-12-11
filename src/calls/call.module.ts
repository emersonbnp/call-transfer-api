import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CallController } from './controller/call.controller';
import { CallService } from './service/call.service';
import { CallRepository } from './repository/call.repository';
import { ICallRepository } from './repository/call.repository.interface';
import { Call, CallSchema } from './schemas/call';
import { ICallService } from './service/call.service.interface';
import { SecurityModule } from 'src/security/jwt.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Call.name, schema: CallSchema }]),
    SecurityModule,
  ],
  controllers: [CallController],
  providers: [
    JwtService,
    CallService,
    {
      provide: ICallRepository,
      useClass: CallRepository,
    },
    {
      provide: ICallService,
      useClass: CallService,
    },
  ],
  exports: [ICallService],
})
export class CallModule { }
