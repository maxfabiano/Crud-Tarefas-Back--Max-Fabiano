import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Task } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Task')
@Controller('Task')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Post()
  async create(@Body() dto: CreateTaskDto): Promise<Task> {
    return this.taskService.create(dto);
  }

  @Get()
  async findAll(): Promise<Task[]> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return this.taskService.findAll();
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.taskService.delete(id);
  }
}
