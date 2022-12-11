import { Pagination } from '../dtos/paginationfilter';
import { RegionFilter } from '../dtos/regionfilter';
import { Call } from '../schemas/call';

export interface ICallRepository {
  delete(call: Call): Promise<Call>;
  findByIdAndUserUuid(id: string, userUuid: string): Promise<Call>;
  add(call: Call): Promise<Call>;
  getCallsByFilter(
    filter: RegionFilter,
    pagination: Pagination,
    userUuid: string,
  ): Promise<Call[]>;
}

export const ICallRepository = Symbol('ICallRepository');
