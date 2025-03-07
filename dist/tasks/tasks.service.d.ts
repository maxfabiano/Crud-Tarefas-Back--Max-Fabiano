import { PrismaService } from '../prisma.service';
import { Task } from '@prisma/client';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
export declare class TasksService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateTaskDto): Promise<Task>;
    findAll(): Promise<Task[]>;
    update(id: number, dto: UpdateTaskDto): Promise<Task>;
    delete(id: number): Promise<Task>;
}
