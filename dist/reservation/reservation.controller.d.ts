import { ReservationService } from './reservation.service';
import { BuyTicketDto } from './dto/buyTicket.dto';
import { User } from 'src/user/entities/user.entity';
import { Point } from 'src/user/entities/point.entity';
export declare class ReservationController {
    private readonly reservationService;
    constructor(reservationService: ReservationService);
    buyTicket(buyTicketDto: BuyTicketDto, info: {
        user: User;
        point: Point;
    }): Promise<{
        message: string;
        "\uC794\uC5EC \uD3EC\uC778\uD2B8": Promise<Point>;
    }>;
    myTicket(info: {
        user: User;
    }): Promise<{
        ticketID: string;
        "\uACF5\uC5F0 \uC774\uB984": string;
        "\uACF5\uC5F0 \uC7A5\uC18C": string;
        "\uACF5\uC5F0 \uB0A0\uC9DC": string[];
        "\uC778\uC6D0 \uC218": number;
        "\uACB0\uC81C \uAE08\uC561": number;
        "\uC608\uB9E4 \uB0A0\uC9DC": Date;
        "\uC608\uB9E4 \uC0C1\uC138ID": string;
    }[]>;
    myTicketDetails(id: string, info: {
        user: User;
    }): Promise<{
        ticketID: string;
        "\uACF5\uC5F0 \uC774\uB984": string;
        "\uACF5\uC5F0 \uC7A5\uC18C": string;
        "\uC88C\uC11D \uC815\uBCF4": {
            "\uC88C\uC11D \uB4F1\uAE09": string;
            "\uC88C\uC11D \uBC88\uD638": number;
        };
        금액: number;
    }[]>;
    ticketCancel(id: string, info: {
        user: User;
    }): Promise<{
        message: string;
        "\uC794\uC5EC \uD3EC\uC778\uD2B8"?: undefined;
    } | {
        message: string;
        "\uC794\uC5EC \uD3EC\uC778\uD2B8": Point;
    }>;
}
