import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Call } from '../schemas/call';
import { Pagination } from '../dtos/paginationfilter';
import { RegionFilter } from '../dtos/regionfilter';
import { ICallRepository } from '../repository/call.repository.interface';
import { ICallService } from './call.service.interface';
import { uuid } from 'uuidv4';


@Injectable()
export class CallService implements ICallService {
  private readonly logger = new Logger(CallService.name);
  constructor(
    @Inject(ICallRepository) private readonly callRepository: ICallRepository,
  ) {}

  async delete(id: string, user: any): Promise<Call> {
    this.logger.log('user in call transfer api ---------->', user);
    const call = await this.callRepository.findByIdAndUserUuid(
      id,
      user,
    );
    if (!call) throw new NotFoundException();
    await this.callRepository.delete(call);
    return call;
  }

  async add(call: Call, userUuid: string): Promise<Call> {
    call.userUuid = userUuid;
    call.uuid = uuid();
    return this.callRepository.add(call);
  }

  async edit(call: Call, userUuid: string): Promise<Call> {
    call.userUuid = call.userUuid;
    return this.callRepository.edit(call, userUuid );
  }

  async getCallsByFilter(
    filter: RegionFilter,
    pagination: Pagination,
    userUuid: string,
    uuid: string,
  ): Promise<Call[]> {
    return this.callRepository.getCallsByFilter(filter, pagination, userUuid, uuid);
  }

  async getCurrentLocalization(call: Call): Promise<Call> {
    return this.callRepository.getCurrentLocalization(call);
  }

}
