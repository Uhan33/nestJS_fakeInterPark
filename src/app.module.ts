import Joi from 'joi';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';
import { Point } from './user/entities/point.entity';
import { UserModule } from './user/user.module';
import { ShowModule } from './show/show.module';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { Show } from './show/entities/show.entity';
import { ReservationModule } from './reservation/reservation.module';
import { SeatInfo } from './concert-hall/entities/seatInfo.entity';
import { Reservation } from './reservation/entities/reservation.entity';
import { ReservationInfo } from './reservation/entities/reservationInfo.entity';
import { ConcertHall } from './concert-hall/entities/concertHall.entity';
import { ConcertHallModule } from './concert-hall/concert-hall.module';

const typeOrmModuleOptions = {
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    namingStrategy: new SnakeNamingStrategy(),
    type: 'mysql',
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    database: configService.get('DB_NAME'),
    entities: [User, Point, Show, ConcertHall, SeatInfo, Reservation, ReservationInfo], // 엔티티는 반드시 여기에 명시!
    synchronize: configService.get('DB_SYNC'),
    logging: true,
  }),
  inject: [ConfigService],
  async dataSourceFactory(option: DataSourceOptions) {
    if (!option)
      throw new Error('Invalid options passed');

    return addTransactionalDataSource(new DataSource(option));
  }
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET_KEY: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_NAME: Joi.string().required(),
        DB_SYNC: Joi.boolean().required(),
      }),
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
    AuthModule,
    UserModule,
    ShowModule,
    ReservationModule,
    ConcertHallModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
