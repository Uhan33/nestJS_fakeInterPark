import { BadRequestException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Show } from './entities/show.entity';
import { Like, Repository } from 'typeorm';
import _ from 'lodash';
import { ConcertHallService } from '../concert-hall/concert-hall.service';
import { ReservationInfo } from '../reservation/entities/reservationInfo.entity';

@Injectable()
export class ShowService {
    constructor(
        @InjectRepository(Show)
        private showRepository: Repository<Show>,
        @InjectRepository(ReservationInfo)
        private reservationInfoRepository: Repository<ReservationInfo>,
        @Inject(ConcertHallService)
        private readonly concertHallService: ConcertHallService,
        // @Inject(forwardRef(() => ReservationService))
        // private readonly reservationService: ReservationService,
    ) { }

    async register(showName: string, content: string, category: string, image: string, price: number, concertHallId: number, showDate: Array<string>) {
        const checkConcertHall = await this.concertHallService.findConcertHall(concertHallId);
        if (_.isNil(checkConcertHall))
            throw new NotFoundException('존재하지 않는 공연장입니다.');

        const checkShow = await this.checkShowByName(showName);
        if (await this.checkShowByName(showName))
            throw new BadRequestException('이미 존재하는 공연명 입니다.');

        const newShow = await this.showRepository.save({
            showName,
            content,
            category,
            image,
            price,
            concertHallId,
            showDate,
        })

        return newShow;
    }

    async list(orderKey: string, orderValue: string, page: number, perPage: number) {
        if (!orderValue) orderValue = "desc";
        else
            orderValue.toUpperCase() !== "ASC"
                ? (orderValue = "desc")
                : (orderValue = "asc");

        if (!orderKey || orderKey !== "showName") orderKey = "id";

        const showList = await this.showRepository.find({
            cache: true,
            select: { showName: true, category: true, showDate: true },

            take: +perPage,
            skip: (page - 1) * perPage,
            order: { [orderKey]: orderValue }
        })

        return showList;
    }

    async listByShowName(showName: string, page: number, perPage: number) {
        if (_.isNil(showName))
            showName = "";

        const showList = await this.showRepository.find({
            cache: true,
            where: { showName: Like(`%${showName}%`) },
            select: { showName: true, category: true, showDate: true },

            take: +perPage,
            skip: (page - 1) * perPage,
        })

        return showList;
    }

    async showDetail(id: number) {
        const showDetail = await this.checkShowById(id);
        if (_.isNil(showDetail)) {
            throw new NotFoundException('존재하지 않는 공연입니다.');
        }

        const concertHall = await this.concertHallService.findConcertHall(showDetail.concertHallId);
        const countSeat = await this.reservationInfoRepository.countBy({showId: id});

        const koreaTimeDiff: number = 9 * 60 * 60 * 1000;
        const showTime = new Date(new Date(showDetail.showDate.join('T')).getTime());
        const rightNow = new Date(new Date().getTime() + koreaTimeDiff);


        if (countSeat >= concertHall.maxSeat || showTime.getTime() - rightNow.getTime() < 0.5 * 60 * 60 * 10000) {
            return { ...showDetail, "예약유무": "불가" };
        }
        return { ...showDetail, "예약유무": "가능" };
    }

    async remainSeatByShow(id: number) {
        
    }

    async checkShowById(id: number) {
        return await this.showRepository.findOneBy({ id });
    }

    async checkShowByName(showName: string) {
        return await this.showRepository.findOneBy({ showName });
    }
}
