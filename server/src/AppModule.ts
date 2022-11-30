import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './GlobalExceptionFilter';
import { AuthModule } from './modules/auth';
import { ConfigModule } from '@nestjs/config';
import { QuestionModule } from './modules/question/QuestionModule';
import { WorkbookModule } from './modules/workbook/WorkbookModule';
import { TestModule } from './modules/test/TestModule';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, QuestionModule, WorkbookModule, TestModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
