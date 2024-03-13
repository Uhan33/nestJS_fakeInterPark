import { Show } from 'src/show/entities/show.entity';
import { User } from 'src/user/entities/user.entity';
import { ReservationInfo } from './reservationInfo.entity';
export declare class Reservation {
    id: string;
    userId: number;
    showId: number;
    people: number;
    totalPrice: number;
    createdAt: Date;
    user: User;
    show: Show;
    reservationInfo: ReservationInfo;
}
