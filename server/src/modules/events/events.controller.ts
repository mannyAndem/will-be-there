import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EventsService } from './events.service';

@Controller('events')
@ApiTags('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get()
  @ApiOperation({ summary: 'Events list' })
  @ApiOkResponse({
    schema: {
      example: {
        status: 'success',
        data: [],
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Events retrieved' })
  getEvents() {
    return this.eventsService.getEvents();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Event details' })
  @ApiOkResponse({
    schema: {
      example: {
        status: 'success',
        data: [],
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Event retrieved' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  getEvent(@Param('id') id: number) {
    return this.eventsService.getEvent(id);
  }
}
