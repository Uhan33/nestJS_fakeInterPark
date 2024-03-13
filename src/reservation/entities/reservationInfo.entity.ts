import { SeatInfo } from 'src/concert-hall/entities/seatInfo.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Reservation } from './reservation.entity';
import { Show } from '../../show/entities/show.entity';

@Entity({
  name: 'reservationInfos',
})
export class ReservationInfo {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({type: 'uuid'})
  reservationId: string;

  @Column({type: 'int'})
  showId: number;

  @Column({ type: 'uuid', nullable: false })
  seatInfoId: string;

  @Column({ type: 'varchar', nullable: false })
  seatGrade: string;

  @Column({ type: 'int', nullable: false })
  seatNumber: number;

  @ManyToOne(() => Reservation, (reservation) => reservation.reservationInfo, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  reservation: Reservation;

  @ManyToOne(() => Show, (show) => show.reservationInfo)
  @JoinColumn()
  show: Show;

  @ManyToOne(() => SeatInfo, (seatInfo) => seatInfo.reservationInfo)
  @JoinColumn()
  seatInfo: SeatInfo;



}