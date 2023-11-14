"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const call_controller_1 = require("./controller/call.controller");
const call_service_1 = require("./service/call.service");
const call_repository_1 = require("./repository/call.repository");
const call_repository_interface_1 = require("./repository/call.repository.interface");
const call_1 = require("./schemas/call");
const call_service_interface_1 = require("./service/call.service.interface");
const jwt_module_1 = require("../security/jwt.module");
const jwt_1 = require("@nestjs/jwt");
let CallModule = class CallModule {
};
CallModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: call_1.Call.name, schema: call_1.CallSchema }]),
            jwt_module_1.SecurityModule,
        ],
        controllers: [call_controller_1.CallController],
        providers: [
            jwt_1.JwtService,
            call_service_1.CallService,
            {
                provide: call_repository_interface_1.ICallRepository,
                useClass: call_repository_1.CallRepository,
            },
            {
                provide: call_service_interface_1.ICallService,
                useClass: call_service_1.CallService,
            },
        ],
        exports: [call_service_interface_1.ICallService],
    })
], CallModule);
exports.CallModule = CallModule;
//# sourceMappingURL=call.module.js.map