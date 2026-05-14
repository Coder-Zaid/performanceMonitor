import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll(orgId: string) {
    return this.prisma.user.findMany({
      where: { orgId },
      include: {
        department: { select: { name: true } },
        role: { select: { name: true } },
      },
      orderBy: { firstName: 'asc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        department: true,
        role: true,
        organization: true,
      },
    });
  }
}
