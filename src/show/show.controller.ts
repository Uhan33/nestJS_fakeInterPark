import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ShowService } from './show.service';
import { RegisterShowDto } from './dto/registerShow.dto';
import _ from 'lodash';
import { RolesGuard } from '../auth/role.guard';
import { Roles } from '../utils/roles.decorator';
import { Role } from '../user/types/userRole.type';

@Controller('show')
export class ShowController {
    constructor(private readonly showService: ShowService) { }
    
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @Post('register')
    async register(@Body() registerShowDto: RegisterShowDto) {
        return await this.showService.register(
            registerShowDto.showName,
            registerShowDto.content,
            registerShowDto.category,
            registerShowDto.image,
            registerShowDto.price,
            registerShowDto.concertHallId,
            registerShowDto.showDate,
        );
    }

    @Get('list')
    async list(@Query('orderKey') orderKey: string, @Query('orderValue') orderValue: string, @Query('page') page: number, @Query('perPage') perPage: number) {
        return await this.showService.list(orderKey, orderValue, page | 1, perPage | 10);
    }

    @Get('listByShowName')
    async listByShowName(@Query('showName') showName: string, page: number, perPage: number) {
        return await this.showService.listByShowName(showName, page | 1, perPage | 10);
    }

    @Get('showDetail/:id')
    async showDetail(@Param('id') id: number) {
        return await this.showService.showDetail(id);
    }
}
