import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm';
import { ReservationInfo } from './entities/reservationInfo.entity';
import { ShowService } from '../show/show.service';
import { ConcertHallService } from '../concert-hall/concert-hall.service';
import { UserService } from '../user/user.service';
export declare class ReservationService {
    private reservationRepository;
    private reservationInfoRepository;
    private readonly showService;
    private readonly concertHallService;
    private readonly userService;
    constructor(reservationRepository: Repository<Reservation>, reservationInfoRepository: Repository<ReservationInfo>, showService: ShowService, concertHallService: ConcertHallService, userService: UserService);
    buyTicket(userId: number, point: number, showId: number, people: number, seatInfo: JSON[]): Promise<{
        message: string;
        "\uC794\uC5EC \uD3EC\uC778\uD2B8": number;
    }>;
    myTicket(userId: number): Promise<{
        ticketID: string;
        "\uACF5\uC5F0 \uC774\uB984": string;
        "\uACF5\uC5F0 \uC7A5\uC18C": string;
        "\uACF5\uC5F0 \uB0A0\uC9DC": string[];
        "\uC778\uC6D0 \uC218": number;
        "\uACB0\uC81C \uAE08\uC561": number;
        "\uC608\uB9E4 \uB0A0\uC9DC": Date;
        "\uC608\uB9E4 \uC0C1\uC138ID": string;
    }[]>;
    myTicketDetails(ticketId: string, userId: number): Promise<{
        ticketID: string;
        "\uACF5\uC5F0 \uC774\uB984": string;
        "\uACF5\uC5F0 \uC7A5\uC18C": string;
        "\uC88C\uC11D \uC815\uBCF4": {
            "\uC88C\uC11D \uB4F1\uAE09": string;
            "\uC88C\uC11D \uBC88\uD638": number;
        };
        금액: number;
    }[]>;
    ticketCancel(ticketId: string, userId: number): Promise<{
        message: string;
        "\uC794\uC5EC \uD3EC\uC778\uD2B8"?: undefined;
    } | {
        message: string;
        "\uC794\uC5EC \uD3EC\uC778\uD2B8": import("src/user/entities/point.entity").Point;
    }>;
    checkTicket(id: string): Promise<Reservation>;
    checkSeat(showId: number, seatGrade: string, seatNumber: number): Promise<ReservationInfo>;
    countSeat(showId: number): Promise<number>;
}
