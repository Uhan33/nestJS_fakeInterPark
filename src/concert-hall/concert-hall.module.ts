import { Module } from '@nestjs/common';
import { ConcertHallService } from './concert-hall.service';
import { ConcertHallController } from './concert-hall.controller';
import { ConcertHall } from './entities/concertHall.entity';
import { SeatInfo } from './entities/seatInfo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([ConcertHall, SeatInfo])],
    providers: [ConcertHallService],
    controllers: [ConcertHallController],
    exports: [ConcertHallService],
})
export class ConcertHallModule {
}
