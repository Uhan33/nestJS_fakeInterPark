"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const joi_1 = __importDefault(require("joi"));
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const user_entity_1 = require("./user/entities/user.entity");
const point_entity_1 = require("./user/entities/point.entity");
const user_module_1 = require("./user/user.module");
const show_module_1 = require("./show/show.module");
const typeorm_transactional_1 = require("typeorm-transactional");
const typeorm_2 = require("typeorm");
const app_service_1 = require("./app.service");
const app_controller_1 = require("./app.controller");
const show_entity_1 = require("./show/entities/show.entity");
const reservation_module_1 = require("./reservation/reservation.module");
const seatInfo_entity_1 = require("./concert-hall/entities/seatInfo.entity");
const reservation_entity_1 = require("./reservation/entities/reservation.entity");
const reservationInfo_entity_1 = require("./reservation/entities/reservationInfo.entity");
const concertHall_entity_1 = require("./concert-hall/entities/concertHall.entity");
const concert_hall_module_1 = require("./concert-hall/concert-hall.module");
const typeOrmModuleOptions = {
    useFactory: async (configService) => ({
        namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
        type: 'mysql',
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        database: configService.get('DB_NAME'),
        entities: [user_entity_1.User, point_entity_1.Point, show_entity_1.Show, concertHall_entity_1.ConcertHall, seatInfo_entity_1.SeatInfo, reservation_entity_1.Reservation, reservationInfo_entity_1.ReservationInfo],
        synchronize: configService.get('DB_SYNC'),
        logging: true,
    }),
    inject: [config_1.ConfigService],
    async dataSourceFactory(option) {
        if (!option)
            throw new Error('Invalid options passed');
        return (0, typeorm_transactional_1.addTransactionalDataSource)(new typeorm_2.DataSource(option));
    }
};
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validationSchema: joi_1.default.object({
                    JWT_SECRET_KEY: joi_1.default.string().required(),
                    DB_USERNAME: joi_1.default.string().required(),
                    DB_PASSWORD: joi_1.default.string().required(),
                    DB_HOST: joi_1.default.string().required(),
                    DB_PORT: joi_1.default.number().required(),
                    DB_NAME: joi_1.default.string().required(),
                    DB_SYNC: joi_1.default.boolean().required(),
                }),
            }),
            typeorm_1.TypeOrmModule.forRootAsync(typeOrmModuleOptions),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            show_module_1.ShowModule,
            reservation_module_1.ReservationModule,
            concert_hall_module_1.ConcertHallModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map