import { BadRequestException, Injectable } from '@nestjs/common';
import cloudinary from 'src/lib/cloudinary';
import { PrismaService } from 'src/prisma.service';
import { CreateEventDto, RSVPDto, UpdateEventDto } from './eventDto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async getEvents(userId: string) {
    const events = await this.prisma.event.findMany({
      include: { media: true, rsvps: true },
      where: { organizerId: userId },
    });

    return {
      status: 'success',
      data: events,
    };
  }

  async createEvent(data: CreateEventDto, userId: string) {
    console.log(data);
    const event = await this.prisma.event.create({
      data: {
        ...data,
        media: {
          createMany: {
            data: data.media,
            skipDuplicates: false,
          },
        },
        organizer: { connect: { id: userId } },
      },
    });

    return {
      status: 'success',
      data: event,
    };
  }

  async createRsvp(data: RSVPDto, eventId: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    let rsvp;

    if (!user) {
      rsvp = await this.prisma.rsvp.create({
        data: {
          ...data,
          event: { connect: { id: eventId } },
        },
      });
    } else {
      rsvp = await this.prisma.rsvp.create({
        data: {
          ...data,
          event: { connect: { id: eventId } },
          user: user ? { connect: { id: user.id } } : null,
        },
      });
    }

    return {
      status: 'success',
      data: rsvp,
    };
  }

  async updateEvent(id: string, data: UpdateEventDto) {
    const event = await this.prisma.event.findFirst({ where: { id } });

    if (!event) throw new BadRequestException('Event not found');

    const updatedEvent = await this.prisma.event.update({
      where: { id },
      data: {
        ...data,
        media: {
          createMany: {
            data: data.media,
            skipDuplicates: false,
          },
        },
      },
    });

    return {
      status: 'success',
      data: updatedEvent,
    };
  }

  async getEvent(id: string) {
    const event = await this.prisma.event.findFirst({ where: { id } });

    if (!event) throw new BadRequestException('Event not found');

    return {
      status: 'success',
      data: event,
    };
  }

  async deleteEvent(id: string) {
    const event = await this.prisma.event.findFirst({
      where: { id },
      include: { media: true },
    });

    if (!event) throw new BadRequestException('Event not found');

    const mediaPromise = event.media.map(async (media) => {
      await cloudinary.uploader.destroy(media.cloudinaryId);
      return this.prisma.media.delete({ where: { id: media.id } });
    });

    await Promise.all(mediaPromise);

    const deletedEvent = await this.prisma.event.delete({ where: { id } });
    return {
      status: 'success',
      data: deletedEvent,
    };
  }
}
