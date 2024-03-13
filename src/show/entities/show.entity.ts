import { Reservation } from 'src/reservation/entities/reservation.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ConcertHall } from '../../concert-hall/entities/concertHall.entity';
import { ReservationInfo } from 'src/reservation/entities/reservationInfo.entity';

@Entity({
  name: 'shows',
})
export class Show {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  concertHallId: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  showName: string;

  @Column({ type: 'varchar', nullable: false })
  content: string;
  
  @Column({ type: 'json', nullable: false })
  showDate: string[];
  
  @Column({ type: 'varchar', nullable: true })
  image: string;
  
  @Column({ type: 'varchar', nullable: false })
  category: string;

  @Column({ type: 'int', nullable: false })
  price: number;

  @OneToMany(() => Reservation, (reservation) => reservation.show)
  reservation: Reservation[];

  @OneToMany(() => ReservationInfo, (reservationInfo) => reservationInfo.show)
  reservationInfo: ReservationInfo[];

  @ManyToOne(() => ConcertHall, (concertHall) => concertHall.show, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  concertHall: ConcertHall;
}