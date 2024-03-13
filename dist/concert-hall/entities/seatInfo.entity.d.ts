import { ConcertHall } from './concertHall.entity';
import { ReservationInfo } from '../../reservation/entities/reservationInfo.entity';
export declare class SeatInfo {
    id: string;
    concertHallId: number;
    grade: string;
    price: number;
    maxSeat: number;
    concertHall: ConcertHall;
    reservationInfo: ReservationInfo;
}
