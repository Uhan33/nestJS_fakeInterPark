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
exports.BuyTicketDto = void 0;
const class_validator_1 = require("class-validator");
class BuyTicketDto {
}
exports.BuyTicketDto = BuyTicketDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: '공연 Id를 입력해주세요.' }),
    __metadata("design:type", Number)
], BuyTicketDto.prototype, "showId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: '인원 수를 입력해주세요.' }),
    __metadata("design:type", Number)
], BuyTicketDto.prototype, "people", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNotEmpty)({ message: '좌석 정보를 입력해주세요.' }),
    __metadata("design:type", Array)
], BuyTicketDto.prototype, "seatInfo", void 0);
//# sourceMappingURL=buyTicket.dto.js.map