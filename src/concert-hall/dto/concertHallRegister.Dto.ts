import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ConcertHallRegisterDto {
    @IsString()
    @IsNotEmpty({ message: '공연장 이름을 입력해주세요.' })
    concertHallName: string;
  
    @IsNumber()
    @IsNotEmpty({ message: '공연장 최대 수용 수를 입력해주세요.' })
    maxSeat: number;

    @IsArray()
    @IsNotEmpty({ message: '좌석의 등급을 입력해주세요.' })
    seatInfo: JSON[];

    // @IsNumber()
    // @IsNotEmpty({ message: '좌석의 가격을 입력해주세요.' })
    // price: number[];

    // @IsNumber()
    // @IsNotEmpty({ message: '좌석의 최대 수용 수를 입력해주세요.' })
    // maxSeatByGrade: number[];
  }