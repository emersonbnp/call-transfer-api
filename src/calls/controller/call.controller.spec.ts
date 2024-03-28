import { Test, TestingModule } from '@nestjs/testing';
import { Call, CallSchema } from '../schemas/call';
import { CallService } from '../service/call.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { CallRepository } from '../repository/call.repository';
import { ICallRepository } from '../repository/call.repository.interface';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ICallService } from '../service/call.service.interface';
import { v4 as uuidv4 } from 'uuid';
import { CallController } from './call.controller';

let mongod: MongoMemoryServer;

const rootMongooseTestModule = (options: MongooseModuleOptions = {}) =>
  MongooseModule.forRootAsync({
    useFactory: async () => {
      //mongod = await MongoMemoryServer.create();
      mongod = await MongoMemoryServer.create({ binary: { version: '6.0.1' },}
      
      );
      const mongoUri = mongod.getUri();
      return {
        uri: mongoUri,
        ...options,
      };
    },
  });

const closeInMongodConnection = async () => {
  await mongoose.disconnect();
  if (mongod) await mongod.stop();
};

function createRequest(userUuid: string) {
  return { user: { userUuid: userUuid } };
}

describe('AppController', () => {
  let callController: CallController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: 'calls', schema: CallSchema }]),
      ],
      providers: [
        { provide: ICallService, useClass: CallService },
        { provide: ICallRepository, useClass: CallRepository },
      ],
      controllers: [CallController],
    }).compile();

    callController = module.get<CallController>(CallController);
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });
 
  describe('post call', () => {
    it('should create call with userUuid', async () => {
      // Given
      const userUuid = uuidv4();
      const request = createRequest(userUuid);
      const call: Call = {
        _id: null,
        userUuid: null,
        uuid: null,
        details: {
          description: 'description',
          duration: 12,
          location: {
            coordinates: [1, 2],
            type: 'geolocation',
          },
          paymentValue: 1000,
          startDate: new Date(),
        },
        address: {
          street: "Lindolfo de Azevedo",
          city: "Remígio",
          state: "Paraíba",
          zipCode: "00000000"
          },
        deleted: false,
      };

      // When
      const createdCall = await callController.addCall(call, request);
      
      // Then
      expect(createdCall.userUuid).toBe(userUuid);
    });
  });

  describe('get call by filter', () => {
    it('should return all calls in radius', async () => {
      // Given
      const call: Call = {
        _id: null,
        userUuid: null,
        uuid: null,
        details: {
          description: 'description',
          duration: 12,
          location: {
            coordinates: [-7.121634,-34.8301538],
            type: 'geolocation',
          },
          paymentValue: 1000,
          startDate: new Date(),
        },
        address: {
          street: "Lindolfo de Azevedo",
          city: "Remígio",
          state: "Paraíba",
          zipCode: "00000000"
          },
        deleted: false,
      };
      await callController.addCall(call, createRequest(uuidv4()));
      const filter = { latitude: -34.827179,longitude:-7.1213128, distance: 1000 }

      // When
      const filteredCalls = await callController.getCallsByFilter(filter, null, null, null);
      console.log('FilteredCalls:', filteredCalls)
      // Then
      expect(filteredCalls.length).toBe(1);
    });
  });
});
