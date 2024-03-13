import { Reservation } from '../../reservation/entities/reservation.entity';
import { ConcertHall } from '../../concert-hall/entities/concertHall.entity';
import { ReservationInfo } from '../../reservation/entities/reservationInfo.entity';
export declare class Show {
    id: number;
    concertHallId: number;
    showName: string;
    content: string;
    showDate: string[];
    image: string;
    category: string;
    price: number;
    reservation: Reservation[];
    reservationInfo: ReservationInfo[];
    concertHall: ConcertHall;
}
