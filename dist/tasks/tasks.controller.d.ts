import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { Task } from '@prisma/client';
export declare class TasksController {
    private taskService;
    constructor(taskService: TasksService);
    create(dto: CreateTaskDto): Promise<Task>;
    findAll(): Promise<Task[]>;
    update(id: number, dto: UpdateTaskDto): Promise<Task>;
    delete(id: number): Promise<Task>;
}
