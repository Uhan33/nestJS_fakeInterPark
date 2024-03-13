import { SeatInfo } from 'src/concert-hall/entities/seatInfo.entity';
import { Reservation } from './reservation.entity';
import { Show } from '../../show/entities/show.entity';
export declare class ReservationInfo {
    id: string;
    reservationId: string;
    showId: number;
    seatInfoId: string;
    seatGrade: string;
    seatNumber: number;
    reservation: Reservation;
    show: Show;
    seatInfo: SeatInfo;
}
