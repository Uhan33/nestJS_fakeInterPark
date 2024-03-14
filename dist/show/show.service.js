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
exports.ShowService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const show_entity_1 = require("./entities/show.entity");
const typeorm_2 = require("typeorm");
const lodash_1 = __importDefault(require("lodash"));
const concert_hall_service_1 = require("../concert-hall/concert-hall.service");
const reservationInfo_entity_1 = require("../reservation/entities/reservationInfo.entity");
let ShowService = class ShowService {
    constructor(showRepository, reservationInfoRepository, concertHallService) {
        this.showRepository = showRepository;
        this.reservationInfoRepository = reservationInfoRepository;
        this.concertHallService = concertHallService;
    }
    async register(showName, content, category, image, price, concertHallId, showDate) {
        const checkConcertHall = await this.concertHallService.findConcertHall(concertHallId);
        if (lodash_1.default.isNil(checkConcertHall))
            throw new common_1.NotFoundException('존재하지 않는 공연장입니다.');
        const checkShow = await this.checkShowByName(showName);
        if (await this.checkShowByName(showName))
            throw new common_1.BadRequestException('이미 존재하는 공연명 입니다.');
        const newShow = await this.showRepository.save({
            showName,
            content,
            category,
            image,
            price,
            concertHallId,
            showDate,
        });
        return newShow;
    }
    async list(orderKey, orderValue, page, perPage) {
        if (!orderValue)
            orderValue = "desc";
        else
            orderValue.toUpperCase() !== "ASC"
                ? (orderValue = "desc")
                : (orderValue = "asc");
        if (!orderKey || orderKey !== "showName")
            orderKey = "id";
        const showList = await this.showRepository.find({
            cache: true,
            select: { showName: true, category: true, showDate: true },
            take: +perPage,
            skip: (page - 1) * perPage,
            order: { [orderKey]: orderValue }
        });
        return showList;
    }
    async listByShowName(showName, page, perPage) {
        if (lodash_1.default.isNil(showName))
            showName = "";
        const showList = await this.showRepository.find({
            cache: true,
            where: { showName: (0, typeorm_2.Like)(`%${showName}%`) },
            select: { showName: true, category: true, showDate: true },
            take: +perPage,
            skip: (page - 1) * perPage,
        });
        return showList;
    }
    async showDetail(id) {
        const showDetail = await this.checkShowById(id);
        if (lodash_1.default.isNil(showDetail)) {
            throw new common_1.NotFoundException('존재하지 않는 공연입니다.');
        }
        const concertHall = await this.concertHallService.findConcertHall(showDetail.concertHallId);
        const countSeat = await this.reservationInfoRepository.countBy({ showId: id });
        const koreaTimeDiff = 9 * 60 * 60 * 1000;
        const showTime = new Date(new Date(showDetail.showDate.join('T')).getTime());
        const rightNow = new Date(new Date().getTime() + koreaTimeDiff);
        if (countSeat >= concertHall.maxSeat || showTime.getTime() - rightNow.getTime() < 0.5 * 60 * 60 * 10000) {
            return { ...showDetail, "예약유무": "불가" };
        }
        return { ...showDetail, "예약유무": "가능" };
    }
    async remainSeatByShow(id) {
    }
    async checkShowById(id) {
        return await this.showRepository.findOneBy({ id });
    }
    async checkShowByName(showName) {
        return await this.showRepository.findOneBy({ showName });
    }
};
exports.ShowService = ShowService;
exports.ShowService = ShowService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(show_entity_1.Show)),
    __param(1, (0, typeorm_1.InjectRepository)(reservationInfo_entity_1.ReservationInfo)),
    __param(2, (0, common_1.Inject)(concert_hall_service_1.ConcertHallService)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        concert_hall_service_1.ConcertHallService])
], ShowService);
//# sourceMappingURL=show.service.js.map