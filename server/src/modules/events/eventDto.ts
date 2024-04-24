import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDateString, IsString, ValidateNested } from 'class-validator';

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
}

export class UpdateEventDto extends PartialType(CreateEventDto) {}
