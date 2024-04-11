import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getUser(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      status: 'success',
      data: user,
    };
  }

  async deleteUser(id: string) {
    await this.getUser(id);
    const user = await this.prisma.user.delete({ where: { id } });
    return {
      status: 'success',
      data: user,
    };
  }
}
