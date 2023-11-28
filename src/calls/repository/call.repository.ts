import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pagination } from '../dtos/paginationfilter';
import { RegionFilter } from '../dtos/regionfilter';
import { Call, CallDocument } from '../schemas/call';
import { ICallRepository } from './call.repository.interface';

@Injectable()
export class CallRepository implements ICallRepository {
  constructor(
    @InjectModel('calls') private readonly callModel: Model<CallDocument>,
  ) {}

  async delete(call: Call): Promise<any> {
    call.deleted = true;
    console.log(call);
    return this.callModel.findByIdAndUpdate(call._id, call, { new: true });
  }
  
  async findByIdAndUserUuid(id: string, userUuid: string): Promise<Call> {
    return this.callModel.findOne({ _id: id, userUuid: userUuid }).exec();
  }

  async add(call: Call): Promise<Call> {
    const callCreated = new this.callModel(call);
    const callSaved = callCreated.save();
    console.log(callSaved);
    return callSaved;
  }

  async getCallsByFilter(
    filter: RegionFilter,
    pagination: Pagination,
    userUuid: string,
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
    if (userUuid) {
      userFilter = { userUuid: userUuid };
    }
    return this.callModel
      .find({ ...locationFilter, ...userFilter, deleted: false })
      .skip((pagination.pageNumber - 1) * pagination.pageSize)
      .limit(pagination.pageSize)
      .exec();
  }
}
