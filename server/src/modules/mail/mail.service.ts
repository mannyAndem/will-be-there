import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SeaMailerClient } from 'seamailer-nodejs';
import seamailer from 'src/lib/seamailer';

@Injectable()
export class MailService {
  private readonly seamailer: SeaMailerClient;

  constructor(private configService: ConfigService) {
    this.seamailer = seamailer();
  }

  async sendMail({
    variables,
    templateId,
    title,
    recipient,
  }: {
    variables: any;
    templateId: number;
    title: string;
    recipient: string;
  }) {
    return this.seamailer
      .sendMail({
        to: [{ email: recipient }],
        from: {
          email: 'simonadepetoye@gmail.com',
          name: 'Will-be-there',
        },
        subject: title,
        templateId,
        variables,
      })
      .then(() => {
        return {
          status: 'success',
          message: 'Password reset email sent successfully',
        };
      })
      .catch(() => {
        throw new BadRequestException('Encountered an error');
      });
  }
}
