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
exports.ShowController = void 0;
const common_1 = require("@nestjs/common");
const show_service_1 = require("./show.service");
const registerShow_dto_1 = require("./dto/registerShow.dto");
const role_guard_1 = require("../auth/role.guard");
const roles_decorator_1 = require("../utils/roles.decorator");
const userRole_type_1 = require("../user/types/userRole.type");
let ShowController = class ShowController {
    constructor(showService) {
        this.showService = showService;
    }
    async register(registerShowDto) {
        return await this.showService.register(registerShowDto.showName, registerShowDto.content, registerShowDto.category, registerShowDto.image, registerShowDto.price, registerShowDto.concertHallId, registerShowDto.showDate);
    }
    async list(orderKey, orderValue, page, perPage) {
        return await this.showService.list(orderKey, orderValue, page | 1, perPage | 10);
    }
    async listByShowName(showName, page, perPage) {
        return await this.showService.listByShowName(showName, page | 1, perPage | 10);
    }
    async showDetail(id) {
        return await this.showService.showDetail(id);
    }
};
exports.ShowController = ShowController;
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(userRole_type_1.Role.Admin),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [registerShow_dto_1.RegisterShowDto]),
    __metadata("design:returntype", Promise)
], ShowController.prototype, "register", null);
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Query)('orderKey')),
    __param(1, (0, common_1.Query)('orderValue')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('perPage')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Number]),
    __metadata("design:returntype", Promise)
], ShowController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('listByShowName'),
    __param(0, (0, common_1.Query)('showName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], ShowController.prototype, "listByShowName", null);
__decorate([
    (0, common_1.Get)('showDetail/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ShowController.prototype, "showDetail", null);
exports.ShowController = ShowController = __decorate([
    (0, common_1.Controller)('show'),
    __metadata("design:paramtypes", [show_service_1.ShowService])
], ShowController);
//# sourceMappingURL=show.controller.js.map