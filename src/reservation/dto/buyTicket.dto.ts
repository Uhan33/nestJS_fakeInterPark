import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class BuyTicketDto {

  /**
   * 공연 ID
   * @example 1
   */
  @IsNumber()
  @IsNotEmpty({ message: '공연 Id를 입력해주세요.' })
  showId: number;

  /**
   * 인원 수
   * @example 1
   */
  @IsNumber()
  @IsNotEmpty({ message: '인원 수를 입력해주세요.' })
  people: number;

  /**
   * 좌석 정보
   */
  @IsArray()
  @IsNotEmpty({ message: '좌석 정보를 입력해주세요.' })
  seatInfo: JSON[];

}