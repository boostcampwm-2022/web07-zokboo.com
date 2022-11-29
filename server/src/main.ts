import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import { GlobalExceptionFilter } from './GlobalExceptionFilter';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000', 'http://175.45.201.93:3389'],
    credentials: true,
  });

  const { httpAdapter } = app.get(HttpAdapterHost);

  const config = new DocumentBuilder()
    .setTitle('Zokboo.com API Docs')
    .setDescription('Zokboo.com API Docs')
    .setVersion('1.0')
    .build();

  app.use(cookieParser());
  app.useGlobalFilters(new GlobalExceptionFilter(httpAdapter));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(8080);
}
bootstrap();
