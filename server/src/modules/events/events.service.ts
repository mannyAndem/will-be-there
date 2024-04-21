import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateEventDto, UpdateEventDto } from './eventDto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async getEvents() {
    const events = await this.prisma.event.findMany();

    return {
      status: 'success',
      data: events,
    };
  }

  async createEvent(data: CreateEventDto, userId: string) {
    const event = await this.prisma.event.create({
      data: {
        ...data,
        organizer: { connect: { id: userId } },
      },
    });

    return {
      status: 'success',
      data: event,
    };
  }

  async updateEvent(id: number, data: UpdateEventDto) {
    const event = await this.prisma.event.findFirst({ where: { id } });

    if (!event) throw new BadRequestException('Event not found');

    const updatedEvent = await this.prisma.event.update({
      where: { id },
      data,
    });

    return {
      status: 'success',
      data: updatedEvent,
    };
  }

  async getEvent(id: number) {
    const event = await this.prisma.event.findFirst({ where: { id } });

    if (!event) throw new BadRequestException('Event not found');

    return {
      status: 'success',
      data: event,
    };
  }

  async deleteEvent(id: number) {
    const event = await this.prisma.event.findFirst({ where: { id } });

    if (!event) throw new BadRequestException('Event not found');

    const deletedEvent = await this.prisma.event.delete({ where: { id } });
    return {
      status: 'success',
      data: deletedEvent,
    };
  }
}
