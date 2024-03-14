import { ConcertHall } from './entities/concertHall.entity';
import { Repository } from 'typeorm';
import { SeatInfo } from './entities/seatInfo.entity';
export declare class ConcertHallService {
    private concertHallRepository;
    private seatInfoRepository;
    constructor(concertHallRepository: Repository<ConcertHall>, seatInfoRepository: Repository<SeatInfo>);
    register(concertHallName: string, maxSeat: number, seatInfo: JSON[]): Promise<{
        newConcertHall: {
            concertHallName: string;
            maxSeat: number;
        } & ConcertHall;
        newSeat: SeatInfo[];
    }>;
    findConcertHall(id: number): Promise<ConcertHall>;
    findSeat(concertHallId: number, grade: string): Promise<SeatInfo>;
    findAllSeatInfo(concertHallId: number): Promise<SeatInfo[]>;
}
