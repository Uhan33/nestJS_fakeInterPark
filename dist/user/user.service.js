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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = require("bcrypt");
const lodash_1 = __importDefault(require("lodash"));
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_2 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const point_entity_1 = require("./entities/point.entity");
const typeorm_transactional_1 = require("typeorm-transactional");
const userRole_type_1 = require("./types/userRole.type");
let UserService = class UserService {
    constructor(userRepository, pointRepository, jwtService) {
        this.userRepository = userRepository;
        this.pointRepository = pointRepository;
        this.jwtService = jwtService;
    }
    async register(email, password, nickname, name, phone, role) {
        const existingUser = await this.findByEmail(email);
        if (existingUser) {
            throw new common_1.ConflictException('이미 해당 이메일로 가입된 사용자가 있습니다!');
        }
        const existingNickname = await this.findByNickname(nickname);
        if (existingNickname) {
            throw new common_1.ConflictException('중복된 닉네임입니다!');
        }
        const hashedPassword = await (0, bcrypt_1.hash)(password, 10);
        const newUser = await this.userRepository.save({
            email,
            password: hashedPassword,
            nickname,
            name,
            phone,
            role,
        });
        await this.pointRepository.save({
            userId: newUser.id,
            point: 1000000,
        });
    }
    async login(email, password) {
        const user = await this.userRepository.findOne({
            select: ['id', 'email', 'password'],
            where: { email },
        });
        if (lodash_1.default.isNil(user)) {
            throw new common_1.UnauthorizedException('이메일을 확인해주세요.');
        }
        if (!(await (0, bcrypt_1.compare)(password, user.password))) {
            throw new common_1.UnauthorizedException('비밀번호를 확인해주세요.');
        }
        const payload = { email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    checkUser(userPayload) {
        return `유저 정보: ${JSON.stringify(userPayload)}}`;
    }
    async findByEmail(email) {
        return await this.userRepository.findOneBy({ email });
    }
    async findByNickname(nickname) {
        return await this.userRepository.findOneBy({ nickname });
    }
    async findPoint(userId) {
        return await this.pointRepository.findOneBy({ userId });
    }
    async updatePoint(userId, status, price) {
        const remainPoint = await this.findPoint(userId);
        if (status === 'cancel')
            return await this.pointRepository.update({ userId }, { point: remainPoint.point + price });
        return await this.pointRepository.update({ userId }, { point: remainPoint.point - price });
    }
};
exports.UserService = UserService;
__decorate([
    (0, typeorm_transactional_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "register", null);
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_2.InjectRepository)(point_entity_1.Point)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map