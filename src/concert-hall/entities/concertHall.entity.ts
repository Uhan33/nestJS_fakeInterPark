import { Show } from '../../show/entities/show.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SeatInfo } from './seatInfo.entity';

@Entity({
  name: 'concertHalls',
})
export class ConcertHall {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', unique: true, nullable: false })
    concertHallName: string;

    @Column({ type: 'int', nullable: false })
    maxSeat: number;

    @OneToMany(() => Show, (show) => show.concertHall)
    show: Show[];

    @OneToMany(() => SeatInfo, (seatInfo) => seatInfo.concertHall)
    seatInfo: SeatInfo[];
}