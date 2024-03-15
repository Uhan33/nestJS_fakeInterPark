import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { BuyTicketDto } from './dto/buyTicket.dto';
import { JwtGuard } from '../auth/guards';
import { UserInfo } from '../utils/userInfo.decorator';
import { User } from '../user/entities/user.entity';
import { Point } from '../user/entities/point.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('예매')
@Controller('reservation')
export class ReservationController {
    constructor(private readonly reservationService: ReservationService) { }

    /**
     * 티켓 구매
     * @param buyTicketDto 
     * @param info 
     * @returns 
     */
    @Post('buyTicket')
    @UseGuards(JwtGuard)
    async buyTicket(@Body() buyTicketDto: BuyTicketDto, @UserInfo() info: {user: User, point: Point}) {
        /**
         * 	"seatInfo": [
		        {
			        "grade": "A",
        			"seatNumber": 25
		        },
		        {
			        "grade": "S",
			        "seatNumber": 26
		        }
            ]
         */
        return await this.reservationService.buyTicket(
            info.user.id,
            info.point.point,
            buyTicketDto.showId,
            buyTicketDto.people,
            buyTicketDto.seatInfo,
        )
    }

    /**
     * 공연 별 잔여 좌석 조회
     * @param id 
     * @returns 
     */
    @Get('remainSeat/:id')
    @UseGuards(JwtGuard)
    async remainSeatByShow(@Param('id') id: number) {
        return await this.reservationService.remainSeatByShow(id);
    }

    /**
     * 내 티켓 확인
     * @param info 
     * @returns 
     */
    @Get('myTicket')
    @UseGuards(JwtGuard)
    async myTicket(@UserInfo() info: {user: User}) {
        return await this.reservationService.myTicket(info.user.id);
    }

    /**
     * 내 티켓 상세 정보 조회
     * @param id 
     * @param info 
     * @returns 
     */
    @Get('myTicketDetails/:id')
    @UseGuards(JwtGuard)
    async myTicketDetails(@Param('id') id: string ,@UserInfo() info: {user: User}) {
        return await this.reservationService.myTicketDetails(id, info.user.id);
    }

    /**
     * 티켓 취소
     * @param id 
     * @param info 
     * @returns 
     */
    @Post('ticketCancel/:id')
    @UseGuards(JwtGuard)
    async ticketCancel(@Param('id') id: string, @UserInfo() info: {user: User}) {
        return await this.reservationService.ticketCancel(id, info.user.id)
    }
}
