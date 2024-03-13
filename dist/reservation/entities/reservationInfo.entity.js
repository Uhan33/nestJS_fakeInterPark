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
exports.ReservationInfo = void 0;
const seatInfo_entity_1 = require("../../concert-hall/entities/seatInfo.entity");
const typeorm_1 = require("typeorm");
const reservation_entity_1 = require("./reservation.entity");
const show_entity_1 = require("../../show/entities/show.entity");
let ReservationInfo = class ReservationInfo {
};
exports.ReservationInfo = ReservationInfo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], ReservationInfo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], ReservationInfo.prototype, "reservationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], ReservationInfo.prototype, "showId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: false }),
    __metadata("design:type", String)
], ReservationInfo.prototype, "seatInfoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], ReservationInfo.prototype, "seatGrade", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], ReservationInfo.prototype, "seatNumber", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => reservation_entity_1.Reservation, (reservation) => reservation.reservationInfo, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", reservation_entity_1.Reservation)
], ReservationInfo.prototype, "reservation", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => show_entity_1.Show, (show) => show.reservationInfo),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", show_entity_1.Show)
], ReservationInfo.prototype, "show", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => seatInfo_entity_1.SeatInfo, (seatInfo) => seatInfo.reservationInfo),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", seatInfo_entity_1.SeatInfo)
], ReservationInfo.prototype, "seatInfo", void 0);
exports.ReservationInfo = ReservationInfo = __decorate([
    (0, typeorm_1.Entity)({
        name: 'reservationInfos',
    })
], ReservationInfo);
//# sourceMappingURL=reservationInfo.entity.js.map