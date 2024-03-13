import { BadRequestException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { Reservation } from './entities/reservation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservationInfo } from './entities/reservationInfo.entity';
import { ShowService } from '../show/show.service';
import _ from 'lodash';
import { Transactional } from 'typeorm-transactional';
import { ConcertHallService } from '../concert-hall/concert-hall.service';
import { UserService } from '../user/user.service';

@Injectable()
export class ReservationService {
    constructor(
        @InjectRepository(Reservation)
        private reservationRepository: Repository<Reservation>,
        @InjectRepository(ReservationInfo)
        private reservationInfoRepository: Repository<ReservationInfo>,
        @Inject(ShowService)
        private readonly showService: ShowService,
        @Inject(ConcertHallService)
        private readonly concertHallService: ConcertHallService,
        @Inject(UserService)
        private readonly userService: UserService,
    ) { }

    @Transactional()
    async buyTicket(userId: number, point: number, showId: number, people: number, seatInfo: JSON[]) {
        const checkShow = await this.showService.checkShowById(showId);
        if (_.isNil(checkShow))
            throw new NotFoundException('존재하지 않는 공연입니다.')

        if (people !== seatInfo.length)
            throw new BadRequestException('인원 수와 선택하신 좌석의 갯수가 일치하지 않습니다.');

        const newReservation = await this.reservationRepository.save({
            userId,
            showId,
            people,
        });

        const concertHall = await this.concertHallService.findConcertHall(checkShow.concertHallId);
        let totalPrice: number = 0;
        for (let seat of seatInfo) {
            const findSeat = await this.concertHallService.findSeat(concertHall.id, seat["grade"]);
            if (findSeat.maxSeat < seat["seatNumber"])
                throw new NotFoundException(`존재하지 않는 좌석 번호 입니다. ${seat["grade"]}등급 좌석의 좌석 번호는 0 ~ ${findSeat.maxSeat} 입니다.`);

            if (await this.checkSeat(showId, seat["grade"], seat["seatNumber"]))
                throw new BadRequestException(`${seat["grade"]}등급 ${seat["seatNumber"]}번 좌석은 이미 예매된 좌석입니다.`);

            await this.reservationInfoRepository.save({
                reservationId: newReservation.id,
                showId: showId,
                seatInfoId: findSeat.id,
                seatGrade: seat["grade"],
                seatNumber: seat["seatNumber"],
            })

            totalPrice += (checkShow.price + findSeat.price);
        }

        if(point < totalPrice) {
            throw new BadRequestException('포인트가 부족하여 예매할 수 없습니다.');
        }

        await this.userService.updatePoint(userId, 'buy', totalPrice);
        const remainPoint = await this.userService.findPoint(userId);

        await this.reservationRepository.update({ id: newReservation.id }, { totalPrice: totalPrice });

        return { message: "예매 완료!", "잔여 포인트": remainPoint.point }; 
    }

    async myTicket(userId: number) {
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
            }
        })
    }

    async myTicketDetails(ticketId: string, userId: number) {
        const ticket = await this.checkTicket(ticketId);
        if (ticket.userId !== userId)
            throw new BadRequestException('본인의 티켓만 열람하실 수 있습니다.');

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
            }
        });
    }

    @Transactional()
    async ticketCancel(ticketId: string, userId: number) {
        const ticket = await this.checkTicket(ticketId);
        if (ticket.userId !== userId)
            throw new BadRequestException('본인의 티켓만 취소 가능합니다.');

        const show = await this.showService.checkShowById(ticket.showId);

        const koreaTimeDiff: number = 9 * 60 * 60 * 1000;
        const showTime = new Date(new Date(show.showDate.join('T')).getTime());
        const rightNow = new Date(new Date().getTime() + koreaTimeDiff);

        if(showTime.getTime() - rightNow.getTime() < 3 * 60 * 60 * 10000)
            return {message: '공연 시작 3시간 전 까지만 취소 가능합니다.'};

        await this.userService.updatePoint(userId, 'cancel', ticket.totalPrice);
        const remainPoint = await this.userService.findPoint(userId);

        await this.reservationRepository.delete({ id: ticketId });

        return {message: "취소 완료! 환불되었습니다.", "잔여 포인트": remainPoint}; 
    }

    async checkTicket(id: string) {
        return await this.reservationRepository.findOneBy({ id });
    }

    async checkSeat(showId: number, seatGrade: string, seatNumber: number) {
        return await this.reservationInfoRepository.findOne({
             where: {showId, seatNumber, seatGrade}
            });
    }

    async countSeat(showId: number) {
        return await this.reservationInfoRepository.countBy({showId});
    }
}
