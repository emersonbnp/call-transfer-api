import { Pagination } from '../dtos/paginationfilter';
import { RegionFilter } from '../dtos/regionfilter';
import { Call } from '../schemas/call';

export interface ICallService {
  delete(id: string, user: any): Promise<Call>;
  add(call: Call): Promise<Call>;

  getCallsByFilter(
    filter: RegionFilter,
    pagination: Pagination,
    userUuid: string,
  ): Promise<Call[]>;
}

export const ICallService = Symbol('ICallService');
