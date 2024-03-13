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
exports.ReservationController = void 0;
const common_1 = require("@nestjs/common");
const reservation_service_1 = require("./reservation.service");
const buyTicket_dto_1 = require("./dto/buyTicket.dto");
const guards_1 = require("../auth/guards");
const userInfo_decorator_1 = require("../utils/userInfo.decorator");
let ReservationController = class ReservationController {
    constructor(reservationService) {
        this.reservationService = reservationService;
    }
    async buyTicket(buyTicketDto, info) {
        return await this.reservationService.buyTicket(info.user.id, info.point.point, buyTicketDto.showId, buyTicketDto.people, buyTicketDto.seatInfo);
    }
    async myTicket(info) {
        return await this.reservationService.myTicket(info.user.id);
    }
    async myTicketDetails(id, info) {
        return await this.reservationService.myTicketDetails(id, info.user.id);
    }
    async ticketCancel(id, info) {
        return await this.reservationService.ticketCancel(id, info.user.id);
    }
};
exports.ReservationController = ReservationController;
__decorate([
    (0, common_1.Post)('buyTicket'),
    (0, common_1.UseGuards)(guards_1.JwtGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, userInfo_decorator_1.UserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [buyTicket_dto_1.BuyTicketDto, Object]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "buyTicket", null);
__decorate([
    (0, common_1.Get)('myTicket'),
    (0, common_1.UseGuards)(guards_1.JwtGuard),
    __param(0, (0, userInfo_decorator_1.UserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "myTicket", null);
__decorate([
    (0, common_1.Get)('myTicketDetails/:id'),
    (0, common_1.UseGuards)(guards_1.JwtGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, userInfo_decorator_1.UserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "myTicketDetails", null);
__decorate([
    (0, common_1.Post)('ticketCancel/:id'),
    (0, common_1.UseGuards)(guards_1.JwtGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, userInfo_decorator_1.UserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "ticketCancel", null);
exports.ReservationController = ReservationController = __decorate([
    (0, common_1.Controller)('reservation'),
    __metadata("design:paramtypes", [reservation_service_1.ReservationService])
], ReservationController);
//# sourceMappingURL=reservation.controller.js.map