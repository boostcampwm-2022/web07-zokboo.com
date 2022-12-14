import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import { GlobalExceptionFilter } from './GlobalExceptionFilter';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000', 'http://175.45.201.93:3389', 'https://zokboo.shop', 'https://localhost:3000'],
    credentials: true,
  });

  const { httpAdapter } = app.get(HttpAdapterHost);

  const config = new DocumentBuilder()
    .setTitle('Zokboo.com API Docs')
    .setDescription('부스트캠프 웹 모바일 7기 족부닷컴의 API 명세입니다.')
    .setVersion('1.0')
    .addServer('/api')
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
