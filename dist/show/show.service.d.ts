import { Show } from './entities/show.entity';
import { Repository } from 'typeorm';
import { ConcertHallService } from '../concert-hall/concert-hall.service';
import { ReservationInfo } from '../reservation/entities/reservationInfo.entity';
export declare class ShowService {
    private showRepository;
    private reservationInfoRepository;
    private readonly concertHallService;
    constructor(showRepository: Repository<Show>, reservationInfoRepository: Repository<ReservationInfo>, concertHallService: ConcertHallService);
    register(showName: string, content: string, category: string, image: string, price: number, concertHallId: number, showDate: Array<string>): Promise<{
        showName: string;
        content: string;
        category: string;
        image: string;
        price: number;
        concertHallId: number;
        showDate: string[];
    } & Show>;
    list(orderKey: string, orderValue: string, page: number, perPage: number): Promise<Show[]>;
    listByShowName(showName: string, page: number, perPage: number): Promise<Show[]>;
    showDetail(id: number): Promise<{
        예약유무: string;
        id: number;
        concertHallId: number;
        showName: string;
        content: string;
        showDate: string[];
        image: string;
        category: string;
        price: number;
        reservation: import("src/reservation/entities/reservation.entity").Reservation[];
        reservationInfo: ReservationInfo[];
        concertHall: import("src/concert-hall/entities/concertHall.entity").ConcertHall;
    }>;
    remainSeatByShow(id: number): Promise<void>;
    checkShowById(id: number): Promise<Show>;
    checkShowByName(showName: string): Promise<Show>;
}
