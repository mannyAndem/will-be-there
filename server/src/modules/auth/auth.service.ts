import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CookieOptions, Response } from 'express';
import { comparePassword, hashPassword } from 'src/utils/password';
import { RequestInterfaceWithUser } from 'src/utils/requestInterface';
import { PrismaService } from '../../prisma.service';
import { MailService } from '../mail/mail.service';
import {
  ChangePasswordDto,
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
} from './dto/authDto';

const cookieConfig: CookieOptions = {};

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
    private mailService: MailService,
    private configService: ConfigService,
  ) {}
  async login(data: LoginDto) {
    const account = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!account) throw new BadRequestException("Account doesn't exist");

    if (account.provider === 'local') {
      const validatePassword = await comparePassword(
        data.password,
        account.password,
      );
      if (!validatePassword)
        throw new BadRequestException('Invalid credentials');
    }

    const access_token = this.generateAccessToken({
      email: account.email,
      sub: account.id,
    });
    const refresh_token = this.generateRefreshToken({
      email: account.email,
      sub: account.id,
    });

    return {
      status: 'success',
      message: 'Login successful',
      token: {
        access_token,
        refresh_token,
      },
    };
  }

  async register(data: RegisterDto) {
    const accountExists = await this.prisma.user.count({
      where: {
        email: data.email,
      },
    });

    if (accountExists > 0) {
      throw new BadRequestException('Account already exists');
    }

    const account = await this.prisma.user.create({
      data: {
        ...data,
        password: await hashPassword(data.password),
      },
    });

    const access_token = this.generateAccessToken({
      email: account.email,
      sub: account.id,
    });
    const refresh_token = this.generateRefreshToken({
      email: account.email,
      sub: account.id,
    });

    return {
      status: 'success',
      message: 'Account created successfully',
      token: {
        access_token,
        refresh_token,
      },
    };
  }

  async refreshToken(
    token: string,
    req: RequestInterfaceWithUser,
    res: Response,
  ) {
    if (!token) {
      throw new NotFoundException('Refresh token not found');
    }

    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });

    console.log(payload);

    if (!payload) {
      throw new BadRequestException('Invalid refresh token');
    }

    const { email, sub } = payload;

    const access_token = this.generateAccessToken({ email, sub });

    res.cookie('access_token', access_token, cookieConfig);

    return {
      status: 'success',
      message: 'Token refreshed successfully',
      token: { access_token },
    };
  }

  async getMe(req: RequestInterfaceWithUser) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: req.user.email,
      },
    });

    return {
      status: 'success',
      message: 'User fetched successfully',
      user,
    };
  }

  async forgotPassword(reqData: ForgotPasswordDto) {
    const email = reqData.email;
    const findAccountByEmail = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!findAccountByEmail) throw new NotFoundException('User not found');

    const token = this.jwtService.sign({ email }, { expiresIn: '1d' }); // generate token
    const templateId = this.configService.get('FORGOT_PASSWORD_TEMPLATE_ID'); // get email template ID

    // frontend url
    const baseUrl = this.configService.getOrThrow('FRONTEND_BASE_URL');
    const resetUrl = `${baseUrl}/reset-password?token=${token}`;

    // send mail
    return this.mailService.sendMail({
      recipient: email,
      templateId,
      title: 'Password Reset for Your Account',
      variables: { resetUrl },
    });
  }

  async changePassword(reqData: ChangePasswordDto) {
    const { newPassword, token } = reqData;
    const payload = await this.jwtService.verifyAsync(token);

    const findAccountByEmail = await this.prisma.user.findUnique({
      where: { email: payload?.email },
    });

    if (!findAccountByEmail) throw new NotFoundException('User not found');

    await this.prisma.user.update({
      where: { email: payload.email },
      data: {
        password: await hashPassword(newPassword),
      },
    });

    return {
      status: 'success',
      message: 'Password successfully updated. Please login again',
    };
  }

  generateAccessToken(payload: any): string {
    const expiresIn = '15m';
    return this.jwtService.sign(payload, { expiresIn });
  }

  generateRefreshToken(payload: any): string {
    const expiresIn = '7d';
    return this.jwtService.sign(payload, { expiresIn });
  }
}
