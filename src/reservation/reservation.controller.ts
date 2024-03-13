import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { BuyTicketDto } from './dto/buyTicket.dto';
import { JwtGuard } from '../auth/guards';
import { UserInfo } from '../utils/userInfo.decorator';
import { User } from '../user/entities/user.entity';
import { Point } from '../user/entities/point.entity';

@Controller('reservation')
export class ReservationController {
    constructor(private readonly reservationService: ReservationService) { }

    @Post('buyTicket')
    @UseGuards(JwtGuard)
    async buyTicket(@Body() buyTicketDto: BuyTicketDto, @UserInfo() info: {user: User, point: Point}) {
        return await this.reservationService.buyTicket(
            info.user.id,
            info.point.point,
            buyTicketDto.showId,
            buyTicketDto.people,
            buyTicketDto.seatInfo,
        )
    }

    @Get('myTicket')
    @UseGuards(JwtGuard)
    async myTicket(@UserInfo() info: {user: User}) {
        return await this.reservationService.myTicket(info.user.id);
    }

    @Get('myTicketDetails/:id')
    @UseGuards(JwtGuard)
    async myTicketDetails(@Param('id') id: string ,@UserInfo() info: {user: User}) {
        return await this.reservationService.myTicketDetails(id, info.user.id);
    }

    @Post('ticketCancel/:id')
    @UseGuards(JwtGuard)
    async ticketCancel(@Param('id') id: string, @UserInfo() info: {user: User}) {
        return await this.reservationService.ticketCancel(id, info.user.id)
    }
}
