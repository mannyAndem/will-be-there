import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { RequestInterfaceWithUser } from 'src/utils/requestInterface';
import { CreateEventDto, UpdateEventDto } from './eventDto';
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

  @Post()
  @ApiOperation({ summary: 'Create event' })
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    schema: {
      example: {
        status: 'success',
        data: [],
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Event created' })
  @ApiResponse({ status: 400, description: 'Event not created' })
  createEvent(
    @Body() data: CreateEventDto,
    @Req() req: RequestInterfaceWithUser,
  ) {
    return this.eventsService.createEvent(data, req.user.sub);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update event' })
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    schema: {
      example: {
        status: 'success',
        data: [],
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Event updated' })
  @ApiResponse({ status: 400, description: 'Event not updated' })
  updateEvent(@Param('id') id: string, @Body() data: UpdateEventDto) {
    return this.eventsService.updateEvent(id, data);
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
  getEvent(@Param('id') id: string) {
    return this.eventsService.getEvent(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete event' })
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    schema: {
      example: {
        status: 'success',
        data: [],
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Event deleted' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  deleteEvent(@Param('id') id: string) {
    return this.eventsService.deleteEvent(id);
  }
}
