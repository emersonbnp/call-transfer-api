"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 12:
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CallRepository = void 0;
const common_1 = __webpack_require__(7);
const mongoose_1 = __webpack_require__(8);
const mongoose_2 = __webpack_require__(13);
const call_1 = __webpack_require__(14);
let CallRepository = class CallRepository {
    constructor(callModel) {
        this.callModel = callModel;
    }
    async add(call) {
        const callCreated = new this.callModel(call);
        return callCreated.save();
    }
    async findInRegion(filter, pagination) {
        return this.callModel
            .find({
            'details.location': {
                $near: {
                    $geometry: { type: 'Point', coordinates: [filter.longitude, filter.latitude] },
                    $maxDistance: filter.distance,
                },
            },
        })
            .skip((pagination.pageNumber - 1) * pagination.pageSize).limit(pagination.pageSize)
            .exec();
    }
    async findAll() {
        return this.callModel.find().exec();
    }
};
CallRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(call_1.Call.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], CallRepository);
exports.CallRepository = CallRepository;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("eca07009bce78b15074f")
/******/ })();
/******/ 
/******/ }
;