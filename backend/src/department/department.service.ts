import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DepartmentService {
  constructor(private prisma: PrismaService) {}

  async findAll(orgId: string) {
    return this.prisma.department.findMany({
      where: { orgId },
      include: {
        head: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        _count: {
          select: {
            users: true,
            teams: true,
          },
        },
      },
    });
  }

  async create(orgId: string, data: any) {
    const existing = await this.prisma.department.findUnique({
      where: {
        name_orgId: {
          name: data.name,
          orgId,
        },
      },
    });

    if (existing) {
      throw new ConflictException('Department with this name already exists');
    }

    return this.prisma.department.create({
      data: {
        ...data,
        orgId,
      },
    });
  }

  async update(id: string, orgId: string, data: any) {
    const department = await this.prisma.department.findFirst({
      where: { id, orgId },
    });

    if (!department) {
      throw new NotFoundException('Department not found');
    }

    return this.prisma.department.update({
      where: { id },
      data,
    });
  }

  async remove(id: string, orgId: string) {
    const department = await this.prisma.department.findFirst({
      where: { id, orgId },
    });

    if (!department) {
      throw new NotFoundException('Department not found');
    }

    return this.prisma.department.delete({
      where: { id },
    });
  }
}
