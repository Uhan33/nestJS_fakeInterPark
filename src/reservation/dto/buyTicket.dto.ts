import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BuyTicketDto {
    @IsNumber()
    @IsNotEmpty({ message: '공연 Id를 입력해주세요.' })
    showId: number;
  
    @IsNumber()
    @IsNotEmpty({ message: '인원 수를 입력해주세요.' })
    people: number;

    @IsArray()
    @IsNotEmpty({ message: '좌석 정보를 입력해주세요.' })
    seatInfo: JSON[];

  }