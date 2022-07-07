"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallService = void 0;
const common_1 = require("@nestjs/common");
const call_repository_1 = require("./call.repository");
let CallService = class CallService {
    constructor(callRepository) {
        this.callRepository = callRepository;
    }
    add(call) {
        return this.callRepository.add(call);
    }
    getCallsInRegion(longitude, latitude, distance) {
        return this.callRepository.findInRegion(longitude, latitude, distance);
    }
    getAll() {
        return this.callRepository.findAll();
    }
};
CallService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [call_repository_1.CallRepository])
], CallService);
exports.CallService = CallService;
//# sourceMappingURL=call.service.js.map