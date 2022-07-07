"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 11:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CallController = void 0;
const common_1 = __webpack_require__(7);
const swagger_1 = __webpack_require__(5);
const call_service_1 = __webpack_require__(12);
const call_1 = __webpack_require__(15);
const paginationfilter_1 = __webpack_require__(20);
const regionfilter_1 = __webpack_require__(21);
let CallController = class CallController {
    constructor(callService) {
        this.callService = callService;
    }
    async addCall(response, call) {
        const newCall = await this.callService.add(call);
        return response.status(common_1.HttpStatus.CREATED).json({ data: newCall });
    }
    async getCallsInRegion(longitude, latitude, distance, pageSize, pageNumber, response) {
        const filter = new regionfilter_1.RegionFilter(longitude, latitude, distance);
        const pagination = new paginationfilter_1.Pagination(pageNumber, pageSize);
        const callsInRegion = await this.callService.getCallsInRegion(filter, pagination);
        return response.status(common_1.HttpStatus.OK).json({ data: callsInRegion });
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof call_1.Call !== "undefined" && call_1.Call) === "function" ? _a : Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], CallController.prototype, "addCall", null);
__decorate([
    (0, common_1.Get)("/filter"),
    __param(0, (0, common_1.Query)("longitude")),
    __param(1, (0, common_1.Query)("latitude")),
    __param(2, (0, common_1.Query)("distance")),
    __param(3, (0, common_1.Query)("page_size")),
    __param(4, (0, common_1.Query)("page_number")),
    __param(5, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, Number, Number, Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], CallController.prototype, "getCallsInRegion", null);
CallController = __decorate([
    (0, swagger_1.ApiTags)("calls"),
    (0, common_1.Controller)("/v1/calls"),
    __metadata("design:paramtypes", [typeof (_d = typeof call_service_1.CallService !== "undefined" && call_service_1.CallService) === "function" ? _d : Object])
], CallController);
exports.CallController = CallController;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("cb2ff80c30eec3ed7d24")
/******/ })();
/******/ 
/******/ }
;