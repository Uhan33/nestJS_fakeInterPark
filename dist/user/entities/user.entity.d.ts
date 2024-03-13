import { Role } from '../types/userRole.type';
import { Point } from './point.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';
export declare class User {
    id: number;
    email: string;
    nickname: string;
    password: string;
    name: string;
    phone: string;
    role: Role;
    point: Point;
    reservation: Reservation[];
}
