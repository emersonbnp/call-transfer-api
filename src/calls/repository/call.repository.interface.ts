import { Pagination } from '../dtos/paginationfilter';
import { RegionFilter } from '../dtos/regionfilter';
import { Call } from '../schemas/call';

export interface ICallRepository {
  delete(call: Call): Promise<Call>;
  findByIdAndUserUuid(id: string, userUuid: string): Promise<Call>;
  add(call: Call): Promise<Call>;
  edit(call: Call, userUuid: string): Promise<Call>;
  getCallsByFilter(
    filter: RegionFilter,
    pagination: Pagination,
    userUuid: string,
    uuid: string,
  ): Promise<Call[]>;
  getCurrentLocalization(call: Call): Promise<Call>
}

export const ICallRepository = Symbol('ICallRepository');
