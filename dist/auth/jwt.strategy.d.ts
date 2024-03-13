import { Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userService;
    private readonly configService;
    constructor(userService: UserService, configService: ConfigService);
    private static extractJWT;
    validate(payload: any): Promise<{
        user: import("src/user/entities/user.entity").User;
        point: import("src/user/entities/point.entity").Point;
    }>;
}
export {};
