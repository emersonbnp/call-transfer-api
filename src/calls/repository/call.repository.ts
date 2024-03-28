import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pagination } from '../dtos/paginationfilter';
import { RegionFilter } from '../dtos/regionfilter';
import { Call, CallDocument } from '../schemas/call';
import { ICallRepository } from './call.repository.interface';
import { InternalServerErrorException, NotFoundException, BadRequestException, Logger } from '@nestjs/common';

@Injectable()
export class CallRepository implements ICallRepository {
  private readonly logger = new Logger(CallRepository.name);
  constructor(
    @InjectModel('calls') private readonly callModel: Model<CallDocument>,
  ) {}

  async delete(call: Call): Promise<any> {
    call.deleted = true;
    console.log(call);
    return this.callModel.findByIdAndUpdate(call._id, call, { new: true });
  }
  
  async findByIdAndUserUuid(id: string, userUuid: string): Promise<Call> {
    this.logger.log('id in findByIdAndUserUuid', id);
    this.logger.log('userUuid in findByIdAndUserUuid', userUuid);
    return this.callModel.findOne({ _id: id, userUuid: userUuid }).exec();
  }

  async add(call: Call): Promise<Call> {
    const callCreated = new this.callModel(call);
    const callSaved = callCreated.save();
    console.log(callSaved);
    return callSaved;
  }

  async edit(call: Call, userUuid: string): Promise<Call> {
    const foundCall = await this.callModel.findOne({ uuid: call.uuid, call}).exec();
    console.log('FOUND CALL------------------------------>', call)
    if (!foundCall) {
      throw new NotFoundException('Call not found');
    }
   
   try {
      foundCall.userUuid = call.userUuid
      foundCall.details.description = call.details.description
      foundCall.details.duration = call.details.duration
      foundCall.details.location.coordinates = call.details.location.coordinates
      foundCall.details.location.type = call.details.location.type
      foundCall.details.paymentValue = call.details.paymentValue 
      foundCall.details.startDate = call.details.startDate
      foundCall.address.street = call.address.street
      foundCall.address.city = call.address.city
      foundCall.address.state = call.address.state
      foundCall.address.zipCode = call.address.zipCode

      const updatedCall = await this.callModel.findByIdAndUpdate(foundCall._id, foundCall, { new: true });
      return updatedCall;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  async getCallsByFilter(
    filter: RegionFilter,
    pagination: Pagination,
    userUuid: string,
    uuid: string,
  ): Promise<Call[]> {
    let locationFilter = {};
    let userFilter = {};
    if (filter?.distance) {
      locationFilter = {
        'details.location.coordinates': {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [filter.longitude, filter.latitude],
            },
            $maxDistance: filter.distance,
          },
        },
      };
    }
    if(userUuid) {
      userFilter = { userUuid: userUuid };
    } else if(uuid) {
      userFilter = { uuid: uuid };
    }
    
    return this.callModel
      .find({ ...locationFilter, ...userFilter, deleted: false })
      .skip((pagination.pageNumber - 1) * pagination.pageSize)
      .limit(pagination.pageSize)
      .exec();
  }

  
  async getCurrentLocalization(call: Call): Promise<Call> {   
          const coordinates: number[] = call.details.location.coordinates;
          const [latitude, longitude] = coordinates;
          console.log('REPOSITORY LATITUDE',latitude)
          console.log('REPOSITORY LONGITUDE',longitude)
          console.log(process.env.GOOGLE_API_URL)

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?location=${latitude}%2C${longitude}&radius=500&types=establishment&key=${process.env.GOOGLE_API_URL})`)

        const res = await response.json()

        return res
    } catch (e: any) {
      if (e instanceof NotFoundException) {
        throw new NotFoundException();
      }
      if (e instanceof BadRequestException) {
        throw new BadRequestException();
      }
      throw new InternalServerErrorException();
    }
  }
}
