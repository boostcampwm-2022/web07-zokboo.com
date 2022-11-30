import { Module } from '@nestjs/common';
import { CommonModule } from '../common/CommonModule';
import { TestRepository } from './TestRepository';
import { TestService } from './TestService';

@Module({
  imports: [CommonModule],
  providers: [TestRepository, TestService],
})
export class TestModule {}
