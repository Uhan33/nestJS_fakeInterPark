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
exports.SeatInfo = void 0;
const typeorm_1 = require("typeorm");
const concertHall_entity_1 = require("./concertHall.entity");
const reservationInfo_entity_1 = require("../../reservation/entities/reservationInfo.entity");
let SeatInfo = class SeatInfo {
};
exports.SeatInfo = SeatInfo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], SeatInfo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], SeatInfo.prototype, "concertHallId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], SeatInfo.prototype, "grade", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], SeatInfo.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], SeatInfo.prototype, "maxSeat", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => concertHall_entity_1.ConcertHall, (concertHall) => concertHall.seatInfo, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", concertHall_entity_1.ConcertHall)
], SeatInfo.prototype, "concertHall", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reservationInfo_entity_1.ReservationInfo, (reservation) => reservation.seatInfo),
    __metadata("design:type", reservationInfo_entity_1.ReservationInfo)
], SeatInfo.prototype, "reservationInfo", void 0);
exports.SeatInfo = SeatInfo = __decorate([
    (0, typeorm_1.Entity)({
        name: 'seatInfos',
    })
], SeatInfo);
//# sourceMappingURL=seatInfo.entity.js.map