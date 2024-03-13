import { Column, Entity, Index, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Role } from '../types/userRole.type';
import { Point } from './point.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { Show } from 'src/show/entities/show.entity';

@Index('email', ['email'], { unique: true })
@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  nickname: string;

  @Column({ type: 'varchar', select: false, nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  phone: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  @OneToOne(() => Point, (point) => point.user)
  point: Point;

  @OneToMany(() => Reservation, (reservation) => reservation.user, {
    cascade: true,
  })
  reservation: Reservation[];
}