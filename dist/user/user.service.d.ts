import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { Point } from './entities/point.entity';
import { Role } from './types/userRole.type';
export declare class UserService {
    private userRepository;
    private pointRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, pointRepository: Repository<Point>, jwtService: JwtService);
    register(email: string, password: string, nickname: string, name: string, phone: string, role: Role): Promise<void>;
    login(email: string, password: string): Promise<{
        access_token: string;
    }>;
    checkUser(userPayload: any): string;
    findByEmail(email: string): Promise<User>;
    findByNickname(nickname: string): Promise<User>;
    findPoint(userId: number): Promise<Point>;
    updatePoint(userId: number, status: string, price: number): Promise<import("typeorm").UpdateResult>;
}
