import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CallController } from './call.controller';
import { CallRepository } from './call.repository';
import { CallService } from './call.service';
import { Call, CallSchema } from './document/call';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Call.name, schema: CallSchema }]),
  ],
  controllers: [CallController],
  providers: [CallService, CallRepository],
})
export class CallModule {}
