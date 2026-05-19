import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TargetService {
  constructor(private prisma: PrismaService) {}

  async createTask(
    orgId: string,
    managerId: string,
    employeeId: string,
    title: string,
    description: string,
    dueDate: string,
  ) {
    const manager = await this.prisma.user.findUnique({
      where: { id: managerId },
    });
    const managerName = manager ? `${manager.firstName} ${manager.lastName}` : 'Manager';

    const taskData = {
      title,
      description,
      dueDate,
      createdByName: managerName,
    };

    return this.prisma.note.create({
      data: {
        orgId,
        userId: employeeId,
        type: 'task',
        content: JSON.stringify(taskData),
        visibility: 'pending', // Acts as status: 'pending', 'in_progress', 'completed'
      },
      include: {
        user: true,
      },
    });
  }

  async getTasks(userId: string, role: string, orgId: string) {
    const whereClause: any = {
      orgId,
      type: 'task',
    };

    // Employees only see tasks assigned to them
    if (role === 'employee') {
      whereClause.userId = userId;
    }

    const notes = await this.prisma.note.findMany({
      where: whereClause,
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return notes.map((note) => {
      let parsedContent = { title: '', description: '', dueDate: '', createdByName: '' };
      try {
        parsedContent = JSON.parse(note.content);
      } catch (e) {
        parsedContent = {
          title: note.content,
          description: '',
          dueDate: '',
          createdByName: 'Manager',
        };
      }

      return {
        id: note.id,
        userId: note.userId,
        assigneeName: `${note.user.firstName} ${note.user.lastName}`,
        title: parsedContent.title,
        description: parsedContent.description,
        dueDate: parsedContent.dueDate,
        createdByName: parsedContent.createdByName,
        status: note.visibility, // 'pending', 'in_progress', 'completed'
        createdAt: note.createdAt,
      };
    });
  }

  async updateTaskStatus(taskId: string, status: string, orgId: string) {
    const existing = await this.prisma.note.findFirst({
      where: { id: taskId, orgId, type: 'task' },
    });

    if (!existing) {
      throw new NotFoundException('Task not found');
    }

    return this.prisma.note.update({
      where: { id: taskId },
      data: {
        visibility: status,
      },
    });
  }
}
