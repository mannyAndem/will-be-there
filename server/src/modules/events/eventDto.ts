import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  date: string;

  @IsString()
  @ApiProperty()
  start: Date;

  @IsString()
  @ApiProperty()
  end: Date;

  @IsString()
  @ApiProperty()
  location: string;

  @IsString({ each: true })
  @ApiProperty({ isArray: true })
  media: string[];
}

export class UpdateEventDto extends PartialType(CreateEventDto) {}
