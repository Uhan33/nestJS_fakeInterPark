import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ConcertHallService } from './concert-hall.service';
import { RolesGuard } from '../auth/role.guard';
import { Role } from '../user/types/userRole.type';
import { Roles } from '../utils/roles.decorator';
import { ConcertHallRegisterDto } from './dto/concertHallRegister.Dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('공연장')
@Controller('concert-hall')
export class ConcertHallController {
    constructor(private readonly concertHallService: ConcertHallService) { }

    /**
     * 공연장 추가
     * @param concertHallRegisterDto 
     * @returns 
     */
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @Post('register')
    async register(@Body() concertHallRegisterDto: ConcertHallRegisterDto) {
        /**
         * 	"seatInfo": [
            {
                "grade": "S",
                "price": "50000",
                "maxSeatByGrade": 30
            },
            {
                "grade": "A",
                "price": "30000",
                "maxSeatByGrade": 30
            },
            {
                "grade": "B",
                "price": "10000",
                "maxSeatByGrade": 30
            }]
         */
        return await this.concertHallService.register(
            concertHallRegisterDto.concertHallName,
            concertHallRegisterDto.maxSeat,
            concertHallRegisterDto.seatInfo,
        );
    }
}
