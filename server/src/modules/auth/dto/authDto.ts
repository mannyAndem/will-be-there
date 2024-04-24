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

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  password?: string;

  @IsEnum(OAuth_enum)
  @IsOptional()
  @ApiPropertyOptional({ enum: OAuth_enum })
  provider?: OAuth_enum;
}

export class LoginDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  password: string;

  @ApiPropertyOptional({ enum: OAuth_enum })
  @IsEnum(OAuth_enum)
  @IsOptional()
  provider?: OAuth_enum;
}

export class RefreshDto {
  @IsString()
  @ApiPropertyOptional()
  refresh_token: string;
}

export class ForgotPasswordDto {
  @IsEmail()
  @ApiProperty()
  email: string;
}

export class ChangePasswordDto {
  @IsString()
  @ApiProperty()
  token: string;

  @IsString()
  @ApiProperty()
  newPassword: string;
}
