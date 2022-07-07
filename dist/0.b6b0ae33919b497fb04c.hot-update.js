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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CallService = void 0;
const common_1 = __webpack_require__(7);
const call_repository_1 = __webpack_require__(12);
let CallService = class CallService {
    constructor(callRepository) {
        this.callRepository = callRepository;
    }
    add(call) {
        return this.callRepository.add(call);
    }
    getCallsInRegion(filter, pagination) {
        return this.callRepository.findInRegion(filter, pagination);
    }
    getAll() {
        return this.callRepository.findAll();
    }
};
CallService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof call_repository_1.CallRepository !== "undefined" && call_repository_1.CallRepository) === "function" ? _a : Object])
], CallService);
exports.CallService = CallService;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("05acc4067c7a24fdb3f3")
/******/ })();
/******/ 
/******/ }
;