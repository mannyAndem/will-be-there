import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { RequestInterfaceWithUser } from 'src/utils/requestInterface';
import { AuthService } from './auth.service';
import {
  ChangePasswordDto,
  ForgotPasswordDto,
  LoginDto,
  RefreshDto,
  RegisterDto,
} from './dto/authDto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiOkResponse({
    schema: {
      example: {
        status: 'success',
        message: 'Login successful',
        token: {
          access_token: 'string',
          refresh_token: 'string',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Successful login' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  loginHandler(@Body() data: LoginDto) {
    return this.authService.login(data);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register user' })
  @ApiOkResponse({
    schema: {
      example: {
        status: 'success',
        message: 'Account creation successful',
        token: {
          access_token: 'string',
          refresh_token: 'string',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Successful registration' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  registerHandler(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh token' })
  @ApiOkResponse({
    schema: {
      example: {
        status: 'success',
        message: 'Token refreshed successfully',
        token: {
          access_token: 'string',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Successful refresh' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  refreshTokenHandler(@Body() data: RefreshDto) {
    return this.authService.refreshToken(data.refresh_token);
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get me' })
  @ApiOkResponse({
    schema: {
      example: {
        status: 'success',
        message: 'User fetched successfully',
        user: {},
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Successful get me' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getMeHandler(@Req() req: RequestInterfaceWithUser) {
    return this.authService.getMe(req);
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Forgot Password' })
  @ApiOkResponse({
    schema: {
      example: {
        status: 'success',
        message: 'Email sent successfully',
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Email sent successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  forgotPasswordHandler(@Body() data: ForgotPasswordDto) {
    return this.authService.forgotPassword(data);
  }

  @Post('change-password')
  @ApiOperation({ summary: 'Change Password' })
  @ApiOkResponse({
    schema: {
      example: {
        status: 'success',
        message: 'Password updated successfully. Please login',
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Password updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  changePasswordHandler(@Body() data: ChangePasswordDto) {
    return this.authService.changePassword(data);
  }
}
