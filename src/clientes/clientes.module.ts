import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { PrismaModule } from '../prisma.module';
import { ClientesController } from './clientes.controller';

@Module({
  imports: [PrismaModule],
  providers: [ClientesService],
  controllers: [ClientesController],
  exports: [ClientesService],
})
export class ClientesModule {}
