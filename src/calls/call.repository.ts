import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Call, CallDocument } from './document/call';
import { Pagination } from './dtos/paginationfilter';
import { RegionFilter } from './dtos/regionfilter';

@Injectable()
export class CallRepository {
  constructor(@InjectModel(Call.name) private readonly callModel: Model<CallDocument>) {}

  async add(call: Call): Promise<Call> {
    const callCreated = new this.callModel(call);
    return callCreated.save();
  }

  async findInRegion(filter: RegionFilter, pagination: Pagination): Promise<Call[]> {
    return this.callModel
      .find({
        'details.location': {
          $near: {
            $geometry: { type: 'Point', coordinates: [filter.longitude, filter.latitude] },
            $maxDistance: filter.distance,
          },
        },
      })
      .skip((pagination.pageNumber-1)*pagination.pageSize).limit(pagination.pageSize)
      .exec();
  }
}
