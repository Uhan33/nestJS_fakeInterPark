import { BadRequestException, Injectable } from '@nestjs/common';
import { ConcertHall } from './entities/concertHall.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeatInfo } from './entities/seatInfo.entity';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class ConcertHallService {
    constructor(
        @InjectRepository(ConcertHall)
        private concertHallRepository: Repository<ConcertHall>,
        @InjectRepository(SeatInfo)
        private seatInfoRepository: Repository<SeatInfo>,
    ) { }

    @Transactional()
    async register(concertHallName: string, maxSeat: number, seatInfo: JSON[]) {
        const newConcertHall = await this.concertHallRepository.save({
            concertHallName,
            maxSeat,
        });

        let newSeat: SeatInfo[] = [];
        let totalSeat: number = 0;

        for (let seat of seatInfo) {
            const newSeatInfo = await this.seatInfoRepository.save({
                concertHallId: newConcertHall.id,
                grade: seat["grade"],
                price: seat["price"],
                maxSeat: seat["maxSeatByGrade"],
            })
            totalSeat += seat["maxSeatByGrade"];
            newSeat.push(newSeatInfo)
        }

        if (maxSeat !== totalSeat)
            throw new BadRequestException('공연장의 총 좌석 수와 좌석 정보의 총 좌석 수가 일치하지 않습니다.');

        return { newConcertHall, newSeat };
    }

    async findConcertHall(id: number) {
        return await this.concertHallRepository.findOneBy({id})
    }

    async findSeat(concertHallId: number, grade: string) {
        return await this.seatInfoRepository.findOneBy({concertHallId, grade})
    }

    async findAllSeatInfo(concertHallId: number) { 
        return await this.seatInfoRepository.findBy({concertHallId})
    }
}
