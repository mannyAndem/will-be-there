import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import cloudinary from 'src/lib/cloudinary';
import { PrismaService } from 'src/prisma.service';
import { MailService } from '../mail/mail.service';
import { CreateEventDto, RSVPDto, UpdateEventDto } from './eventDto';

@Injectable()
export class EventsService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
    private configService: ConfigService,
  ) {}

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

    const existingRsvp = await this.prisma.rsvp.findMany({
      where: {
        AND: [{ email: data.email }, { eventId: eventId }],
      },
    });

    const event = await this.prisma.event.findFirst({
      where: { id: eventId },
      include: { organizer: true },
    });

    if (!event) throw new NotFoundException('Event not found');

    let rsvp;

    if (existingRsvp && existingRsvp.length > 0) {
      rsvp = await this.prisma.rsvp.update({
        where: {
          id: existingRsvp[0].id,
        },
        data: {
          ...data,
        },
      });
    } else {
      if (user) {
        rsvp = await this.prisma.rsvp.create({
          data: {
            ...data,
            event: { connect: { id: eventId } },
            user: user ? { connect: { id: user.id } } : null,
          },
        });
      } else {
        rsvp = await this.prisma.rsvp.create({
          data: {
            ...data,
            event: { connect: { id: eventId } },
          },
        });
      }
    }
    const templateId = this.configService.get('RSVP_TEMPLATE_ID');

    await this.mailService.sendMail({
      variables: {
        user: data.name,
        eventName: event.name,
        eventDate: new Date(event.date).toLocaleDateString(),
        startTime: new Date(event.start).toLocaleTimeString(),
        endTime: new Date(event.end).toLocaleTimeString(),
        eventLocation: event.location,
        eventDescription: event.description,
        organizerName: event.organizer.name,
        year: new Date().getFullYear(),
      },
      templateId,
      title: 'RSVP Confirmation',
      recipient: data.email,
    });

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
    const event = await this.prisma.event.findFirst({
      where: { id },
      include: { media: true },
    });

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
