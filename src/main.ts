// src/main.ts (Backend NestJS)
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { PrismaService } from './prisma.service'; // Importe o PrismaService
import { Role } from '@prisma/client'; // Importe o Role do Prisma
import * as bcrypt from 'bcrypt'; // Para criptografar a senha do ADMIN padrão

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Inicializa o PrismaService
  const prismaService = app.get(PrismaService);

  // --- LÓGICA PARA GARANTIR UM ADMIN INICIAL ---
  await initializeAdmin(prismaService);
  // --- FIM DA LÓGICA DE ADMIN INICIAL ---


  // Configuração do ValidationPipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Configuração CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API Conéctar - Gerenciamento de Usuários')
    .setDescription('Documentação da API para o sistema de gerenciamento de usuários da Conéctar.')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', name: 'JWT', description: 'Enter JWT token', in: 'header' },
      'JWT-auth',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3005);
}

// Função para inicializar o primeiro ADMIN
async function initializeAdmin(prisma: PrismaService) {
  try {
    const adminExists = await prisma.user.findFirst({
      where: { role: Role.ADMIN },
    });

    if (!adminExists) {
      const defaultAdminEmail = process.env.DEFAULT_ADMIN_EMAIL || 'admin@admin.com';
      const defaultAdminPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'admin123';
      const hashedPassword = await bcrypt.hash(defaultAdminPassword, 10);

      await prisma.user.create({
        data: {
          name: 'Super Admin',
          email: defaultAdminEmail,
          password: hashedPassword,
          role: Role.ADMIN,
        },
      });
      console.log(`[SEED] Admin inicial criado: ${defaultAdminEmail}`);
    } else {
      console.log('[SEED] Admin já existe. Ignorando criação de admin inicial.');
    }
  } catch (error) {
    console.error('[SEED ERROR] Falha ao inicializar o admin:', error);
  }
}

bootstrap();