import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ConcertHallRegisterDto {
  /**
   * 공연장 이름
   * @example "공연장"
   */
  @IsString()
  @IsNotEmpty({ message: '공연장 이름을 입력해주세요.' })
  concertHallName: string;

  /**
   * 공연장 최대 수용 인원 수
   * @example 100
   */
  @IsNumber()
  @IsNotEmpty({ message: '공연장 최대 수용 수를 입력해주세요.' })
  maxSeat: number;

  /**
   * 좌석 등급과 가격
   */
  @IsArray()
  @IsNotEmpty({ message: '좌석의 등급과 가격, 좌석 등급 별 최대 인원 수를 입력해주세요.' })
  seatInfo: JSON[];
}