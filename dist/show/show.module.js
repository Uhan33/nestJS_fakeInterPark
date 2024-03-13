"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowModule = void 0;
const common_1 = require("@nestjs/common");
const show_service_1 = require("./show.service");
const show_controller_1 = require("./show.controller");
const show_entity_1 = require("./entities/show.entity");
const typeorm_1 = require("@nestjs/typeorm");
const concert_hall_module_1 = require("../concert-hall/concert-hall.module");
const reservationInfo_entity_1 = require("../reservation/entities/reservationInfo.entity");
let ShowModule = class ShowModule {
};
exports.ShowModule = ShowModule;
exports.ShowModule = ShowModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([show_entity_1.Show, reservationInfo_entity_1.ReservationInfo]), concert_hall_module_1.ConcertHallModule],
        providers: [show_service_1.ShowService],
        controllers: [show_controller_1.ShowController],
        exports: [show_service_1.ShowService]
    })
], ShowModule);
//# sourceMappingURL=show.module.js.map