import { Model } from 'mongoose';
import { Call, CallDocument } from './dtos/call';
export declare class CallRepository {
    private readonly callModel;
    constructor(callModel: Model<CallDocument>);
    add(call: Call): Promise<Call>;
    findInRegion(longitude: number, latitude: number, distance: number): Promise<Call[]>;
    findAll(): Promise<Call[]>;
}
