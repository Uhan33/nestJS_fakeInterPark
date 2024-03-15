import { IsEmail, IsEnum, IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { Role } from '../types/userRole.type';

export class RegisterDto {

  /**
   * 이메일
   * @example "exapmle@example.com"
   */
  @IsEmail()
  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  email: string;

  /**
   * 비밀번호
   * @example "1234"
   */
  @IsString()
  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  @Length(8)
  password: string;

  /**
   * 닉네임
   * @example "닉네임"
   */
  @IsString()
  @IsNotEmpty({ message: '닉네임을 입력해주세요.' })
  nickname: string;

  /**
   * 이름
   * @example "이름"
   */
  @IsString()
  @IsNotEmpty({ message: '이름을 입력해주세요.' })
  name: string;

  /**
   * 전화번호
   * @example "010-0000-0000"
   */
  @IsNotEmpty({ message: '전화번호를 입력해주세요.' })
  @Matches(/^\d{3}-\d{3,4}-\d{4}$/)
  phone: string;

  /**
   * 권한
   * @example "user/admin"
   */
  @IsEnum(Role)
  role: Role;
}