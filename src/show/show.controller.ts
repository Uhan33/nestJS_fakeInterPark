import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ShowService } from './show.service';
import { RegisterShowDto } from './dto/registerShow.dto';
import _ from 'lodash';
import { RolesGuard } from '../auth/role.guard';
import { Roles } from '../utils/roles.decorator';
import { Role } from '../user/types/userRole.type';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('공연')
@Controller('show')
export class ShowController {
    constructor(private readonly showService: ShowService) { }
    
    /**
     * 공연 등록
     * @param registerShowDto 
     * @returns 
     */
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

    /**
     * 공연 리스트 조회
     * @param orderKey 
     * @param orderValue 
     * @param page 
     * @param perPage 
     * @returns 
     */
    @Get('list')
    async list(@Query('orderKey') orderKey: string, @Query('orderValue') orderValue: string, @Query('page') page: number, @Query('perPage') perPage: number) {
        return await this.showService.list(orderKey, orderValue, page | 1, perPage | 10);
    }

    /**
     * 공연 이름 검색
     * @param showName 
     * @param page 
     * @param perPage 
     * @returns 
     */
    @Get('listByShowName')
    async listByShowName(@Query('showName') showName: string, page: number, perPage: number) {
        return await this.showService.listByShowName(showName, page | 1, perPage | 10);
    }

    /**
     * 공연 상세 정보 조회
     * @param id 
     * @returns 
     */
    @Get('showDetail/:id')
    async showDetail(@Param('id') id: number) {
        return await this.showService.showDetail(id);
    }
}
