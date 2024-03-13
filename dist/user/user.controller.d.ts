/// <reference types="cookie-parser" />
import { Response, Request } from 'express';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import { Point } from './entities/point.entity';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(registerDto: RegisterDto): Promise<void>;
    login(loginDto: LoginDto, res: Response, req: Request): Promise<{
        message: string;
    }>;
    getUserInfo(req: Request, info: {
        user: User;
        point: Point;
    }): {
        이메일: string;
        닉네임: string;
        이름: string;
        포인트: number;
    };
}
