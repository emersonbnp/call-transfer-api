"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 15:
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CallSchema = exports.Call = void 0;
const mongoose_1 = __webpack_require__(9);
const contact_1 = __webpack_require__(17);
const details_1 = __webpack_require__(18);
let Call = class Call {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: details_1.Details }),
    __metadata("design:type", typeof (_a = typeof details_1.Details !== "undefined" && details_1.Details) === "function" ? _a : Object)
], Call.prototype, "details", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: contact_1.Contact }),
    __metadata("design:type", typeof (_b = typeof contact_1.Contact !== "undefined" && contact_1.Contact) === "function" ? _b : Object)
], Call.prototype, "contact", void 0);
Call = __decorate([
    (0, mongoose_1.Schema)({ autoIndex: true })
], Call);
exports.Call = Call;
exports.CallSchema = mongoose_1.SchemaFactory.createForClass(Call);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("b3c51748a3dd20f23573")
/******/ })();
/******/ 
/******/ }
;