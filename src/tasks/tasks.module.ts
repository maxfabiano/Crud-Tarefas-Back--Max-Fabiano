import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaModule } from '../prisma.module'; // Importando PrismaModule

@Module({
  imports: [PrismaModule], // Importa o módulo do Prisma
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
