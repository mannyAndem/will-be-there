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

  async sendForgotPasswordToken(email: string, token: string) {
    const baseUrl = this.configService.getOrThrow('FRONTEND_BASE_URL'); // Assuming you have frontend URL

    const resetUrl = `${baseUrl}/reset-password?token=${token}`; // Construct reset password URL

    const content = `
    <style>
        body {
        font-family: sans-serif;
        margin: 0;
        padding: 0;
        }
    
        h2 {
        margin: 20px 0;
        font-size: 1.5rem;
        }
    
        p {
        margin: 10px 0;
        line-height: 1.5;
        }
    
        a {
        color: #3498db;
        text-decoration: none;
        }
    
        a:hover {
        text-decoration: underline;
        }
    </style>
    
    <h2>Password Reset Request</h2>
    <p>Hi there,</p>
    <p>We received a request to reset your password for your account associated with this email address.</p>
    <p>If you did not initiate this request, you can safely ignore this email.</p>
    <p>To reset your password, please click the following link:</p>
    <a href="${resetUrl}" style="margin: 40px auto;">
        <button style="background-color: #3498db; color: white; padding: 10px 20px; border-radius: 5px;">
            Reset Password
        </button>
    </a>
    <p>This link will expire in 24 hours. If you do not reset your password within 24 hours, you will need to request a new password reset token.</p>
    <p>Sincerely,</p>
    <p>Will-be-there</p>
    `;

    return this.seamailer
      .sendMail({
        to: [{ email }],
        from: {
          email: 'simonadepetoye@gmail.com',
          name: 'Simon',
        },
        subject: 'Password Reset for Your Account',
        htmlPart: content,
        templateId: this.configService.get('FORGOT_PASSWORD_TEMPLATE_ID'),
      })
      .then((data) => {
        console.log(data);
        return {
          status: 'success',
          message: 'Password reset email sent successfully',
        };
      })
      .catch((error) => {
        console.log(error);
        throw new BadRequestException('Encountered an error');
      });
  }
}
