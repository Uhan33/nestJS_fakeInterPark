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
exports.ConcertHallService = void 0;
const common_1 = require("@nestjs/common");
const concertHall_entity_1 = require("./entities/concertHall.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const seatInfo_entity_1 = require("./entities/seatInfo.entity");
const typeorm_transactional_1 = require("typeorm-transactional");
let ConcertHallService = class ConcertHallService {
    constructor(concertHallRepository, seatInfoRepository) {
        this.concertHallRepository = concertHallRepository;
        this.seatInfoRepository = seatInfoRepository;
    }
    async register(concertHallName, maxSeat, seatInfo) {
        const newConcertHall = await this.concertHallRepository.save({
            concertHallName,
            maxSeat,
        });
        let newSeat = [];
        let totalSeat = 0;
        for (let seat of seatInfo) {
            const newSeatInfo = await this.seatInfoRepository.save({
                concertHallId: newConcertHall.id,
                grade: seat["grade"],
                price: seat["price"],
                maxSeat: seat["maxSeatByGrade"],
            });
            totalSeat += seat["maxSeatByGrade"];
            newSeat.push(newSeatInfo);
        }
        if (maxSeat !== totalSeat)
            throw new common_1.BadRequestException('공연장의 총 좌석 수와 좌석 정보의 총 좌석 수가 일치하지 않습니다.');
        return { newConcertHall, newSeat };
    }
    async findConcertHall(id) {
        return await this.concertHallRepository.findOneBy({ id });
    }
    async findSeat(concertHallId, grade) {
        return await this.seatInfoRepository.findOneBy({ concertHallId, grade });
    }
    async findAllSeatInfo(concertHallId) {
        return await this.seatInfoRepository.findBy({ concertHallId });
    }
};
exports.ConcertHallService = ConcertHallService;
__decorate([
    (0, typeorm_transactional_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Array]),
    __metadata("design:returntype", Promise)
], ConcertHallService.prototype, "register", null);
exports.ConcertHallService = ConcertHallService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(concertHall_entity_1.ConcertHall)),
    __param(1, (0, typeorm_1.InjectRepository)(seatInfo_entity_1.SeatInfo)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ConcertHallService);
//# sourceMappingURL=concert-hall.service.js.map