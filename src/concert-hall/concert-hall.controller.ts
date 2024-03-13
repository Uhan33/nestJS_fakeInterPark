import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ConcertHallService } from './concert-hall.service';
import { RolesGuard } from 'src/auth/role.guard';
import { Role } from 'src/user/types/userRole.type';
import { Roles } from 'src/utils/roles.decorator';
import { ConcertHallRegisterDto } from './dto/concertHallRegister.Dto';

@Controller('concert-hall')
export class ConcertHallController {
    constructor(private readonly concertHallService: ConcertHallService) { }

    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @Post('register')
    async register(@Body() concertHallRegisterDto: ConcertHallRegisterDto) {
        return await this.concertHallService.register(
            concertHallRegisterDto.concertHallName,
            concertHallRegisterDto.maxSeat,
            concertHallRegisterDto.seatInfo,
        );
    }
}
