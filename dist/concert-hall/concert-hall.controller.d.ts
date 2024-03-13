import { ConcertHallService } from './concert-hall.service';
import { ConcertHallRegisterDto } from './dto/concertHallRegister.Dto';
export declare class ConcertHallController {
    private readonly concertHallService;
    constructor(concertHallService: ConcertHallService);
    register(concertHallRegisterDto: ConcertHallRegisterDto): Promise<{
        newConcertHall: {
            concertHallName: string;
            maxSeat: number;
        } & import("src/concert-hall/entities/concertHall.entity").ConcertHall;
        newSeat: import("src/concert-hall/entities/seatInfo.entity").SeatInfo[];
    }>;
}
