import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RegisterShowDto {
    @IsString()
    @IsNotEmpty({ message: '공연 이름을 입력해주세요.' })
    showName: string;
  
    @IsString()
    @IsNotEmpty({ message: '공연 설명을 입력해주세요.' })
    content: string;

    @IsArray()
    @IsNotEmpty({ message: '공연 날짜와 시간을 입력해주세요.' })
    showDate: Array<string>;

    @IsString()
    @IsNotEmpty({ message: '공연 카테고리를 입력해주세요.' })
    category: string;

    @IsString()
    @IsNotEmpty({ message: '공연 이미지를 입력해주세요.' })
    image: string;

    @IsNumber()
    @IsNotEmpty({ message: '공연 가격을 입력해주세요.' })
    price: number;

    @IsNumber()
    @IsNotEmpty({ message: '공연장 Id를 입력해주세요.' })
    concertHallId: number;
  }