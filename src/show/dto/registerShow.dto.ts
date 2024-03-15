import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RegisterShowDto {

  /**
   * 공연명
   * @example "공연이름"
   */
  @IsString()
  @IsNotEmpty({ message: '공연 이름을 입력해주세요.' })
  showName: string;

  /**
   * 공연 설명
   * @example "공연 설명"
   */
  @IsString()
  @IsNotEmpty({ message: '공연 설명을 입력해주세요.' })
  content: string;

  /**
   * 공연 날짜
   * @example ["2024-02-15", "18:30"]
   */
  @IsArray()
  @IsNotEmpty({ message: '공연 날짜와 시간을 입력해주세요.' })
  showDate: Array<string>;

  /**
   * 공연 카테고리
   * @example "카테고리"
   */
  @IsString()
  @IsNotEmpty({ message: '공연 카테고리를 입력해주세요.' })
  category: string;

  /**
   * 공연 이미지
   * @example "공연 이미지"
   */
  @IsString()
  @IsNotEmpty({ message: '공연 이미지를 입력해주세요.' })
  image: string;

  /**
   * 공연 가격
   * @example 30000
   */
  @IsNumber()
  @IsNotEmpty({ message: '공연 가격을 입력해주세요.' })
  price: number;

  /**
   * 공연장 Id
   * @example "1"
   */
  @IsNumber()
  @IsNotEmpty({ message: '공연장 Id를 입력해주세요.' })
  concertHallId: number;
}