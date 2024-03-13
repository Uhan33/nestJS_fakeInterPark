import { UserInfo, UserPoint } from '../utils/userInfo.decorator';

import { Body, Controller, Get, Post, Res, UseGuards, Req } from '@nestjs/common';
import { Response, Request } from 'express';
// import { AuthGuard } from '@nestjs/passport';

import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import { Point } from './entities/point.entity';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { JwtGuard } from '../auth/guards';
// import { AuthGuard } from 'src/auth/jwtAuth.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        return await this.userService.register(
            registerDto.email, 
            registerDto.password,
            registerDto.nickname,
            registerDto.name,
            registerDto.phone,
            registerDto.role);
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response, @Req() req: Request) {
        const jwt = await this.userService.login(loginDto.email, loginDto.password);
        res.cookie('user_token', jwt.access_token, {
            httpOnly: true,
            maxAge: 12 * 60 * 60 * 1000
        })
        return {message: "로그인 성공!"};
    }

    @UseGuards(JwtGuard)
    @Get('userInfo')
    getUserInfo(@Req() req: Request, @UserInfo() info: {user: User, point: Point}) {
        console.log(req.user);
        console.log(info);
        console.log(info.point.point, info.user.email);
        return { 
            이메일: info.user.email,
            닉네임: info.user.nickname,
            이름: info.user.name, 
            포인트: info.point.point,
        };
    }
}