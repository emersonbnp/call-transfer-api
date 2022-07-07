import { Injectable } from '@nestjs/common';
import { CallRepository } from './call.repository';
import { Call } from './document/call';
import { Pagination } from './dtos/paginationfilter';
import { RegionFilter } from './dtos/regionfilter';

@Injectable()
export class CallService {
  constructor(private readonly callRepository: CallRepository) {}

  add(call: Call): Promise<Call> {
    return this.callRepository.add(call);
  }

  getCallsInRegion(filter: RegionFilter, pagination: Pagination): Promise<Call[]> {
    return this.callRepository.findInRegion(filter, pagination);
  }
}
