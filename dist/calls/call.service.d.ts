import { CallRepository } from './call.repository';
import { Call } from './document/call';
export declare class CallService {
    private readonly callRepository;
    constructor(callRepository: CallRepository);
    add(call: Call): Promise<Call>;
    getCallsInRegion(longitude: number, latitude: number, distance: number): Promise<Call[]>;
    getAll(): Promise<Call[]>;
}
