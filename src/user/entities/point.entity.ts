import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import {User} from '../../user/entities/user.entity';

@Entity({
  name: 'point',
})
export class Point {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  point: number;

  @OneToOne(() => User, (user) => user.point)
  @JoinColumn({name: 'userId'})
  user: User;

  @Column({type: 'int', unique: true, name: 'userId'})
  userId: number;

}