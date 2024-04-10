import { Body, Controller, Post, Res } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto, RefreshDto, RegisterDto } from './dto/authDto';

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
  loginHandler(
    @Body() data: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(data, response);
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
  registerHandler(@Body() data: RegisterDto, @Res() response: Response) {
    return this.authService.register(data, response);
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
  refreshTokenHandler(
    @Res({ passthrough: true }) response: Response,
    @Body() data: RefreshDto,
  ) {
    return this.authService.refreshToken(data.refresh_token, response);
  }
}
