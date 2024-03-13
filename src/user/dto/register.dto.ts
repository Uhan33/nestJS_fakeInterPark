import { IsEmail, IsEnum, IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { Role } from '../types/userRole.type';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  @Length(8)
  password: string;

  @IsString()
  @IsNotEmpty({ message: '닉네임을 입력해주세요.' })
  nickname: string;

  @IsString()
  @IsNotEmpty({ message: '이름을 입력해주세요.' })
  name: string;

  @IsNotEmpty({ message: '전화번호를 입력해주세요.' })
  @Matches(/^\d{3}-\d{3,4}-\d{4}$/)
  phone: string;

  @IsEnum(Role)
  role: Role;
}