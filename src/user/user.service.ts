import { compare, hash } from 'bcrypt';
import _ from 'lodash';
import { Repository } from 'typeorm';

import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { Point } from './entities/point.entity';
import { Transactional } from 'typeorm-transactional';
import { Role } from './types/userRole.type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Point)
    private pointRepository: Repository<Point>,
    private readonly jwtService: JwtService,
  ) { }

  @Transactional()
  async register(email: string, password: string, nickname: string, name: string, phone: string, role: Role) {
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException(
        '이미 해당 이메일로 가입된 사용자가 있습니다!',
      );
    }

    const existingNickname = await this.findByNickname(nickname);

    if (existingNickname) {
      throw new ConflictException(
        '중복된 닉네임입니다!',
      );
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await this.userRepository.save({
      email,
      password: hashedPassword,
      nickname,
      name,
      phone,
      role,
    });
    await this.pointRepository.save({
      userId: newUser.id,
      point: 1000000,
    });
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({
      select: ['id', 'email', 'password'],
      where: { email },
    });
    if (_.isNil(user)) {
      throw new UnauthorizedException('이메일을 확인해주세요.');
    }

    if (!(await compare(password, user.password))) {
      throw new UnauthorizedException('비밀번호를 확인해주세요.');
    }

    const payload = { email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  checkUser(userPayload: any) {
    return `유저 정보: ${JSON.stringify(userPayload)}}`;
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async findByNickname(nickname: string) {
    return await this.userRepository.findOneBy({ nickname });
  }

  async findPoint(userId: number) {
    return await this.pointRepository.findOneBy({userId});
  }

  async updatePoint(userId: number, status: string, price: number) {
    const remainPoint = await this.findPoint(userId);
    if(status === 'cancel')
      return await this.pointRepository.update({userId}, {point: remainPoint.point + price});

    return await this.pointRepository.update({userId}, {point: remainPoint.point - price});
  }
}