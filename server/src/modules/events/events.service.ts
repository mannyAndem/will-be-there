import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

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

  async getEvent(id: number) {
    const event = await this.prisma.event.findFirst({ where: { id } });

    if (!event) throw new BadRequestException('Event not found');

    return {
      status: 'success',
      data: event,
    };
  }
}
