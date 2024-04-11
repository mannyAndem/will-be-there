import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async getUsers() {
    const users = await this.prisma.user.findMany();
    return {
      status: 'success',
      data: users,
    };
  }

  async deleteUser(id: string) {
    const user = await this.prisma.user.delete({ where: { id } });
    return {
      status: 'success',
      data: user,
    };
  }
}
