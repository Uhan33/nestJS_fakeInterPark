import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Request as RequestType } from 'express';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';
import _ from 'lodash';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userService: UserService,
        private readonly configService: ConfigService,) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                JwtStrategy.extractJWT,
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET_KEY'),
        });
    }

    private static extractJWT(req: RequestType): string | null {
        if (
            req.cookies &&
            'user_token' in req.cookies &&
            req.cookies.user_token.length > 0
        ) {
            return req.cookies.user_token;
        }
        return null;
    }

    async validate(payload: any) {
        const user = await this.userService.findByEmail(payload.email);
        if (_.isNil(user)) {
            throw new NotFoundException('해당하는 사용자를 찾을 수 없습니다.');
        }
        const point = await this.userService.findPoint(user.id);
        return {user, point};
    }
}
