import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ConcertHall } from './concertHall.entity';
import { ReservationInfo } from '../../reservation/entities/reservationInfo.entity';

@Entity({
  name: 'seatInfos',
})
export class SeatInfo {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: 'int', nullable: false})
    concertHallId: number;

    @Column({ type: 'varchar', nullable: false})
    grade: string;

    @Column({ type: 'int', nullable: false})
    price: number;

    @Column({ type: 'int', nullable: false})
    maxSeat: number;

    @ManyToOne(() => ConcertHall, (concertHall) => concertHall.seatInfo, {
      onDelete: 'CASCADE',
    })
    @JoinColumn()
    concertHall: ConcertHall;

    @OneToMany(() => ReservationInfo, (reservation) => reservation.seatInfo)
    reservationInfo: ReservationInfo;
}