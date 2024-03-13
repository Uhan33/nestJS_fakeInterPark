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
exports.ConcertHall = void 0;
const show_entity_1 = require("../../show/entities/show.entity");
const typeorm_1 = require("typeorm");
const seatInfo_entity_1 = require("./seatInfo.entity");
let ConcertHall = class ConcertHall {
};
exports.ConcertHall = ConcertHall;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ConcertHall.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', unique: true, nullable: false }),
    __metadata("design:type", String)
], ConcertHall.prototype, "concertHallName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], ConcertHall.prototype, "maxSeat", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => show_entity_1.Show, (show) => show.concertHall),
    __metadata("design:type", Array)
], ConcertHall.prototype, "show", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => seatInfo_entity_1.SeatInfo, (seatInfo) => seatInfo.concertHall),
    __metadata("design:type", Array)
], ConcertHall.prototype, "seatInfo", void 0);
exports.ConcertHall = ConcertHall = __decorate([
    (0, typeorm_1.Entity)({
        name: 'concertHalls',
    })
], ConcertHall);
//# sourceMappingURL=concertHall.entity.js.map