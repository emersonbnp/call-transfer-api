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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallController = void 0;
const common_1 = require("@nestjs/common");
const call_service_1 = require("./call.service");
const call_1 = require("./document/call");
const paginationfilter_1 = require("./dtos/paginationfilter");
const regionfilter_1 = require("./dtos/regionfilter");
let CallController = class CallController {
    constructor(callService) {
        this.callService = callService;
    }
    async addCall(response, call) {
        const newCall = await this.callService.add(call);
        return response.status(common_1.HttpStatus.CREATED).json({ data: newCall });
    }
    async getCallsInRegion(regionFilter, pagination, response) {
        console.log(regionFilter, pagination);
        return null;
    }
    async getAll(response) {
        const calls = await this.callService.getAll();
        return response.status(common_1.HttpStatus.OK).json({ data: calls });
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, call_1.Call]),
    __metadata("design:returntype", Promise)
], CallController.prototype, "addCall", null);
__decorate([
    (0, common_1.Get)("/filter"),
    __param(0, (0, common_1.Query)("region")),
    __param(1, (0, common_1.Query)("pagination")),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [regionfilter_1.RegionFilter,
        paginationfilter_1.Pagination, Object]),
    __metadata("design:returntype", Promise)
], CallController.prototype, "getCallsInRegion", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CallController.prototype, "getAll", null);
CallController = __decorate([
    (0, common_1.Controller)("/v1/calls"),
    __metadata("design:paramtypes", [call_service_1.CallService])
], CallController);
exports.CallController = CallController;
//# sourceMappingURL=call.controller.js.map