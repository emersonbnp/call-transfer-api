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
exports.CallSchema = exports.Call = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const contact_1 = require("./contact");
const details_1 = require("./details");
let Call = class Call {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: details_1.Details }),
    __metadata("design:type", details_1.Details)
], Call.prototype, "details", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: contact_1.Contact }),
    __metadata("design:type", contact_1.Contact)
], Call.prototype, "contact", void 0);
Call = __decorate([
    (0, mongoose_1.Schema)({ autoIndex: true })
], Call);
exports.Call = Call;
exports.CallSchema = mongoose_1.SchemaFactory.createForClass(Call);
//# sourceMappingURL=call.js.map