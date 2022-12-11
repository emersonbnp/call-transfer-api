import { Test, TestingModule } from '@nestjs/testing';
import { CallService } from '../service/call.service';
import { CallController } from './call.controller';

describe('AppController', () => {
  let appController: CallController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CallController],
      providers: [CallService],
    }).compile();

    appController = app.get<CallController>(CallController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      // expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
