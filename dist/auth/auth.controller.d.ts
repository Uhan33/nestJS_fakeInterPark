import { JwtService } from '@nestjs/jwt';
export declare class AuthController {
    private jwtService;
    constructor(jwtService: JwtService);
    login(res: any): Promise<{}>;
    logout(res: any): Promise<{}>;
}
