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
exports.RegisterShowDto = void 0;
const class_validator_1 = require("class-validator");
class RegisterShowDto {
}
exports.RegisterShowDto = RegisterShowDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: '공연 이름을 입력해주세요.' }),
    __metadata("design:type", String)
], RegisterShowDto.prototype, "showName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: '공연 설명을 입력해주세요.' }),
    __metadata("design:type", String)
], RegisterShowDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNotEmpty)({ message: '공연 날짜와 시간을 입력해주세요.' }),
    __metadata("design:type", Array)
], RegisterShowDto.prototype, "showDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: '공연 카테고리를 입력해주세요.' }),
    __metadata("design:type", String)
], RegisterShowDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: '공연 이미지를 입력해주세요.' }),
    __metadata("design:type", String)
], RegisterShowDto.prototype, "image", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: '공연 가격을 입력해주세요.' }),
    __metadata("design:type", Number)
], RegisterShowDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: '공연장 Id를 입력해주세요.' }),
    __metadata("design:type", Number)
], RegisterShowDto.prototype, "concertHallId", void 0);
//# sourceMappingURL=registerShow.dto.js.map