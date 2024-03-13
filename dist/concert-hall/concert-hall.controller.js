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
exports.ConcertHallController = void 0;
const common_1 = require("@nestjs/common");
const concert_hall_service_1 = require("./concert-hall.service");
const role_guard_1 = require("../auth/role.guard");
const userRole_type_1 = require("../user/types/userRole.type");
const roles_decorator_1 = require("../utils/roles.decorator");
const concertHallRegister_Dto_1 = require("./dto/concertHallRegister.Dto");
let ConcertHallController = class ConcertHallController {
    constructor(concertHallService) {
        this.concertHallService = concertHallService;
    }
    async register(concertHallRegisterDto) {
        return await this.concertHallService.register(concertHallRegisterDto.concertHallName, concertHallRegisterDto.maxSeat, concertHallRegisterDto.seatInfo);
    }
};
exports.ConcertHallController = ConcertHallController;
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(userRole_type_1.Role.Admin),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [concertHallRegister_Dto_1.ConcertHallRegisterDto]),
    __metadata("design:returntype", Promise)
], ConcertHallController.prototype, "register", null);
exports.ConcertHallController = ConcertHallController = __decorate([
    (0, common_1.Controller)('concert-hall'),
    __metadata("design:paramtypes", [concert_hall_service_1.ConcertHallService])
], ConcertHallController);
//# sourceMappingURL=concert-hall.controller.js.map