import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { Reservation } from './entities/reservation.entity';
import { ReservationInfo } from './entities/reservationInfo.entity';
import { ShowModule } from '../show/show.module';
import { ConcertHallModule } from '../concert-hall/concert-hall.module';
import { UserModule } from '../user/user.module';

@Module({
    imports: [TypeOrmModule.forFeature([Reservation, ReservationInfo]), ShowModule, ConcertHallModule, UserModule],
    providers: [ReservationService],
    controllers: [ReservationController],
    exports: [ReservationService]
  })
export class ReservationModule {}
