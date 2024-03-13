import { Show } from '../../show/entities/show.entity';
import { User } from '../../user/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ReservationInfo } from './reservationInfo.entity';

@Entity({
  name: 'reservations',
})
export class Reservation {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({type: 'int'})
  userId: number;

  @Column({type: 'int'})
  showId: number;

  @Column({ type: 'int', nullable: false })
  people: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  totalPrice: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.reservation, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Show, (show) => show.reservation)
  @JoinColumn()
  show: Show;

  @OneToMany(() => ReservationInfo, (reservationInfo) => reservationInfo.reservation, {
    cascade: true,
  })
  reservationInfo: ReservationInfo;
}