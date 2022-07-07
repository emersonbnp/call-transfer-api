import { CallService } from "./call.service";
import { Call } from "./document/call";
import { Pagination } from "./dtos/paginationfilter";
import { RegionFilter } from "./dtos/regionfilter";
export declare class CallController {
    private readonly callService;
    constructor(callService: CallService);
    addCall(response: any, call: Call): Promise<Call>;
    getCallsInRegion(regionFilter: RegionFilter, pagination: Pagination, response: any): Promise<Call[]>;
    getAll(response: any): Promise<Call[]>;
}
