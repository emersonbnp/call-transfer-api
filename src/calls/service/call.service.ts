import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Call } from '../schemas/call';
import { Pagination } from '../dtos/paginationfilter';
import { RegionFilter } from '../dtos/regionfilter';
import { ICallRepository } from '../repository/call.repository.interface';
import { ICallService } from './call.service.interface';

@Injectable()
export class CallService implements ICallService {
  constructor(
    @Inject(ICallRepository) private readonly callRepository: ICallRepository,
  ) {}

  async delete(id: string, user: any): Promise<Call> {
    const call = await this.callRepository.findByIdAndUserUuid(
      id,
      user.userUuid,
    );
    if (!call) throw new NotFoundException();
    await this.callRepository.delete(call);
    return call;
  }

  async add(call: Call, userUuid: string): Promise<Call> {
    call.userUuid = userUuid;
    return this.callRepository.add(call);
  }

  async getCallsByFilter(
    filter: RegionFilter,
    pagination: Pagination,
    userUuid: string,
  ): Promise<Call[]> {
    return this.callRepository.getCallsByFilter(filter, pagination, userUuid);
  }
}
