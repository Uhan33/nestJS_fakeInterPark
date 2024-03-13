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
exports.ReservationService = void 0;
const common_1 = require("@nestjs/common");
const reservation_entity_1 = require("./entities/reservation.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const reservationInfo_entity_1 = require("./entities/reservationInfo.entity");
const show_service_1 = require("../show/show.service");
const lodash_1 = __importDefault(require("lodash"));
const typeorm_transactional_1 = require("typeorm-transactional");
const concert_hall_service_1 = require("../concert-hall/concert-hall.service");
const user_service_1 = require("../user/user.service");
let ReservationService = class ReservationService {
    constructor(reservationRepository, reservationInfoRepository, showService, concertHallService, userService) {
        this.reservationRepository = reservationRepository;
        this.reservationInfoRepository = reservationInfoRepository;
        this.showService = showService;
        this.concertHallService = concertHallService;
        this.userService = userService;
    }
    async buyTicket(userId, point, showId, people, seatInfo) {
        const checkShow = await this.showService.checkShowById(showId);
        if (lodash_1.default.isNil(checkShow))
            throw new common_1.NotFoundException('존재하지 않는 공연입니다.');
        if (people !== seatInfo.length)
            throw new common_1.BadRequestException('인원 수와 선택하신 좌석의 갯수가 일치하지 않습니다.');
        const newReservation = await this.reservationRepository.save({
            userId,
            showId,
            people,
        });
        const concertHall = await this.concertHallService.findConcertHall(checkShow.concertHallId);
        let totalPrice = 0;
        for (let seat of seatInfo) {
            const findSeat = await this.concertHallService.findSeat(concertHall.id, seat["grade"]);
            if (findSeat.maxSeat < seat["seatNumber"])
                throw new common_1.NotFoundException(`존재하지 않는 좌석 번호 입니다. ${seat["grade"]}등급 좌석의 좌석 번호는 0 ~ ${findSeat.maxSeat} 입니다.`);
            if (await this.checkSeat(showId, seat["grade"], seat["seatNumber"]))
                throw new common_1.BadRequestException(`${seat["grade"]}등급 ${seat["seatNumber"]}번 좌석은 이미 예매된 좌석입니다.`);
            await this.reservationInfoRepository.save({
                reservationId: newReservation.id,
                showId: showId,
                seatInfoId: findSeat.id,
                seatGrade: seat["grade"],
                seatNumber: seat["seatNumber"],
            });
            totalPrice += (checkShow.price + findSeat.price);
        }
        if (point < totalPrice) {
            throw new common_1.BadRequestException('포인트가 부족하여 예매할 수 없습니다.');
        }
        await this.userService.updatePoint(userId, 'buy', totalPrice);
        const remainPoint = await this.userService.findPoint(userId);
        await this.reservationRepository.update({ id: newReservation.id }, { totalPrice: totalPrice });
        return { message: "예매 완료!", "잔여 포인트": remainPoint.point };
    }
    async myTicket(userId) {
        const tickets = await this.reservationRepository.find({
            relations: ['show', 'show.concertHall', 'reservationInfo'],
            where: { userId },
            select: {
                id: true,
                people: true,
                totalPrice: true,
                createdAt: true,
                show: {
                    showName: true, showDate: true,
                    concertHall: {
                        concertHallName: true,
                    }
                },
            }
        });
        return tickets.map((ticket) => {
            return {
                "ticketID": ticket.id,
                "공연 이름": ticket.show.showName,
                "공연 장소": ticket.show.concertHall.concertHallName,
                "공연 날짜": ticket.show.showDate,
                "인원 수": ticket.people,
                "결제 금액": ticket.totalPrice,
                "예매 날짜": ticket.createdAt,
                "예매 상세ID": ticket.reservationInfo.id,
            };
        });
    }
    async myTicketDetails(ticketId, userId) {
        const ticket = await this.checkTicket(ticketId);
        if (ticket.userId !== userId)
            throw new common_1.BadRequestException('본인의 티켓만 열람하실 수 있습니다.');
        const ticketDetails = await this.reservationInfoRepository.find({
            relations: ['show', 'show.concertHall', 'seatInfo'],
            where: { reservationId: ticketId },
            select: {
                id: true,
                reservationId: true,
                show: {
                    showName: true,
                    showDate: true,
                    price: true,
                    concertHall: {
                        concertHallName: true,
                    }
                },
                seatNumber: true,
                seatInfo: {
                    grade: true,
                    price: true,
                }
            }
        });
        return ticketDetails.map((ticketDetail) => {
            return {
                "ticketID": ticketDetail.id,
                "공연 이름": ticketDetail.show.showName,
                "공연 장소": ticketDetail.show.concertHall.concertHallName,
                "좌석 정보": { "좌석 등급": ticketDetail.seatInfo.grade, "좌석 번호": ticketDetail.seatNumber },
                "금액": ticketDetail.show.price + ticketDetail.seatInfo.price,
            };
        });
    }
    async ticketCancel(ticketId, userId) {
        const ticket = await this.checkTicket(ticketId);
        if (ticket.userId !== userId)
            throw new common_1.BadRequestException('본인의 티켓만 취소 가능합니다.');
        const show = await this.showService.checkShowById(ticket.showId);
        const koreaTimeDiff = 9 * 60 * 60 * 1000;
        const showTime = new Date(new Date(show.showDate.join('T')).getTime());
        const rightNow = new Date(new Date().getTime() + koreaTimeDiff);
        if (showTime.getTime() - rightNow.getTime() < 3 * 60 * 60 * 10000)
            return { message: '공연 시작 3시간 전 까지만 취소 가능합니다.' };
        await this.userService.updatePoint(userId, 'cancel', ticket.totalPrice);
        const remainPoint = await this.userService.findPoint(userId);
        await this.reservationRepository.delete({ id: ticketId });
        return { message: "취소 완료! 환불되었습니다.", "잔여 포인트": remainPoint };
    }
    async checkTicket(id) {
        return await this.reservationRepository.findOneBy({ id });
    }
    async checkSeat(showId, seatGrade, seatNumber) {
        return await this.reservationInfoRepository.findOne({
            where: { showId, seatNumber, seatGrade }
        });
    }
    async countSeat(showId) {
        return await this.reservationInfoRepository.countBy({ showId });
    }
};
exports.ReservationService = ReservationService;
__decorate([
    (0, typeorm_transactional_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, Number, Array]),
    __metadata("design:returntype", Promise)
], ReservationService.prototype, "buyTicket", null);
__decorate([
    (0, typeorm_transactional_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], ReservationService.prototype, "ticketCancel", null);
exports.ReservationService = ReservationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(reservation_entity_1.Reservation)),
    __param(1, (0, typeorm_1.InjectRepository)(reservationInfo_entity_1.ReservationInfo)),
    __param(2, (0, common_1.Inject)(show_service_1.ShowService)),
    __param(3, (0, common_1.Inject)(concert_hall_service_1.ConcertHallService)),
    __param(4, (0, common_1.Inject)(user_service_1.UserService)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        show_service_1.ShowService,
        concert_hall_service_1.ConcertHallService,
        user_service_1.UserService])
], ReservationService);
//# sourceMappingURL=reservation.service.js.map