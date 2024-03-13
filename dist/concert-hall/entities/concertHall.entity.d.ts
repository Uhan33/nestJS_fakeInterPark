import { Show } from 'src/show/entities/show.entity';
import { SeatInfo } from './seatInfo.entity';
export declare class ConcertHall {
    id: number;
    concertHallName: string;
    maxSeat: number;
    show: Show[];
    seatInfo: SeatInfo[];
}
