import { ShowService } from './show.service';
import { RegisterShowDto } from './dto/registerShow.dto';
export declare class ShowController {
    private readonly showService;
    constructor(showService: ShowService);
    register(registerShowDto: RegisterShowDto): Promise<{
        showName: string;
        content: string;
        category: string;
        image: string;
        price: number;
        concertHallId: number;
        showDate: string[];
    } & import("src/show/entities/show.entity").Show>;
    list(orderKey: string, orderValue: string, page: number, perPage: number): Promise<import("src/show/entities/show.entity").Show[]>;
    listByShowName(showName: string, page: number, perPage: number): Promise<import("src/show/entities/show.entity").Show[]>;
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
        reservationInfo: import("src/reservation/entities/reservationInfo.entity").ReservationInfo[];
        concertHall: import("src/concert-hall/entities/concertHall.entity").ConcertHall;
    }>;
}
