import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Task } from '@prisma/client';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTaskDto): Promise<Task> {
    return this.prisma.task.create({
      data: {
        title: dto.title,
        body: dto.body,
        userId: dto.userId,
      },
    });
  }

  async findAll(): Promise<Task[]> {
    return this.prisma.task.findMany({});
  }

  async update(id: number, dto: UpdateTaskDto): Promise<Task> {
    return this.prisma.task.update({
      where: { id: id },
      data: {
        title: dto.title,
        body: dto.body,
        isCompleted: dto.isCompleted,
      },
    });
  }

  async delete(id: number): Promise<Task> {
    return this.prisma.task.delete({
      where: { id: id },
    });
  }
}
