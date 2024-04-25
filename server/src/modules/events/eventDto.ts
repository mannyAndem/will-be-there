import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class MediaDto {
  @IsString()
  cloudinaryId: string;

  @IsString()
  imageUrl: string;
}

export class CreateEventDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsDateString()
  @ApiProperty()
  date: string;

  @IsDateString()
  @ApiProperty()
  start: string;

  @IsDateString()
  @ApiProperty()
  end: string;

  @IsString()
  @ApiProperty()
  location: string;

  @ApiProperty({ type: [MediaDto] })
  @ValidateNested()
  media: MediaDto;

  @IsString({ each: true })
  @ApiPropertyOptional()
  @IsOptional()
  expectedGifts?: string[];
}

export class RSVPDto {
  @IsString({ each: true })
  @IsOptional()
  @ApiPropertyOptional()
  guestNames: string[];

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  notes: string;

  @IsString({ each: true })
  @IsOptional()
  @ApiPropertyOptional()
  registry: string[];
}

export class UpdateEventDto extends PartialType(CreateEventDto) {}
