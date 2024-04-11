import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OAuth_enum } from '@prisma/client';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;

  @IsEnum(OAuth_enum)
  @IsOptional()
  @ApiPropertyOptional({ enum: OAuth_enum })
  provider?: OAuth_enum;
}

export class LoginDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;
}

export class RefreshDto {
  @IsString()
  @ApiProperty()
  refresh_token: string;
}
