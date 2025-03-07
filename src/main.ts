import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // Permite requisições de qualquer origem
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: '*', // Permite todos os headers
  });
  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Api de Tarefas')
    .setDescription('Ai de Tarefas')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3005);
}
bootstrap();
