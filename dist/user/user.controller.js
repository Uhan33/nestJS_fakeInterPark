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
exports.UserController = void 0;
const userInfo_decorator_1 = require("../utils/userInfo.decorator");
const common_1 = require("@nestjs/common");
const login_dto_1 = require("./dto/login.dto");
const user_service_1 = require("./user.service");
const register_dto_1 = require("./dto/register.dto");
const guards_1 = require("../auth/guards");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async register(registerDto) {
        return await this.userService.register(registerDto.email, registerDto.password, registerDto.nickname, registerDto.name, registerDto.phone, registerDto.role);
    }
    async login(loginDto, res, req) {
        const jwt = await this.userService.login(loginDto.email, loginDto.password);
        res.cookie('user_token', jwt.access_token, {
            httpOnly: true,
            maxAge: 12 * 60 * 60 * 1000
        });
        return { message: "로그인 성공!" };
    }
    getUserInfo(req, info) {
        console.log(req.user);
        console.log(info);
        console.log(info.point.point, info.user.email);
        return {
            이메일: info.user.email,
            닉네임: info.user.nickname,
            이름: info.user.name,
            포인트: info.point.point,
        };
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.JwtGuard),
    (0, common_1.Get)('userInfo'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, userInfo_decorator_1.UserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUserInfo", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map