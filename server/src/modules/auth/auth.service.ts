import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Response } from 'express';
import { comparePassword, hashPassword } from 'src/utils/password';
import { PrismaService } from '../../prisma.service';
import { MailService } from '../mail/mail.service';
import {
  ChangePasswordDto,
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
} from './dto/authDto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
    private mailService: MailService,
  ) {}
  async login(data: LoginDto, res: Response) {
    const account = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!account) throw new BadRequestException("Account doesn't exist");

    const validatePassword = await comparePassword(
      data.password,
      account.password,
    );
    if (!validatePassword) throw new BadRequestException('Invalid credentials');

    const access_token = this.generateAccessToken({ ...account });
    const refresh_token = this.generateRefreshToken({ ...account });

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: true,
    });
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: true,
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

  async register(data: RegisterDto, res: Response) {
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

    const access_token = this.generateAccessToken({ ...account });
    const refresh_token = this.generateRefreshToken({ ...account });

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: true,
    });
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: true,
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

  async refreshToken(token: string, res: Response) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const access_token = this.generateAccessToken(payload);

      res.cookie('access_token', access_token, {
        httpOnly: true,
        secure: true,
      });

      return {
        status: 'success',
        message: 'Token refreshed successfully',
        token: { access_token },
      };
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return { status: 'error', message: 'Token has expired' };
      } else {
        return { status: 'error', message: 'Failed to refresh token' };
      }
    }
  }

  async forgotPassword(reqData: ForgotPasswordDto) {
    const email = reqData.email;
    // const findAccountByEmail = await this.prisma.user.findUnique({
    //   where: { email },
    // });

    // if (!findAccountByEmail) throw new NotFoundException('User not found');

    const token = await this.jwtService.sign({ email }, { expiresIn: '1d' });

    // send mail
    return this.mailService.sendForgotPasswordToken(reqData.email, token);
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
