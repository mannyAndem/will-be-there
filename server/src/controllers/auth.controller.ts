import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { LoginDto, RegisterDto } from 'src/dtos/authDto';
import { AuthService } from 'src/services/auth.service';

@Controller('auth')
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
}