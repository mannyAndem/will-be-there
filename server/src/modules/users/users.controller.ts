import { Controller, Delete, Get, Param } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Fetch all users' })
  @ApiOkResponse({
    schema: {
      example: {
        status: 'success',
        data: [],
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Users fetched' })
  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch user by id' })
  @ApiOkResponse({
    schema: {
      example: {
        status: 'success',
        data: {},
      },
    },
  })
  @ApiResponse({ status: 200, description: 'User fetched' })
  getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiOkResponse({
    schema: {
      example: {
        status: 'success',
        data: {},
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Deleted user' })
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
