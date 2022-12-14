import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaInstance } from '../common/PrismaInstance';
import { WorkbookRepository } from '../workbook/WorkbookRepository';
import Test from './domain/Test';
import WorkbookTest from './domain/WorkbookTest';
import CreateTestRequest from './dto/request/CreateTestRequest';
import TestSimpleResponse from './dto/response/TestSimpleResponse';
import { TestRepository } from './TestRepository';

@Injectable()
export class TestService {
  constructor(
    private readonly testRepository: TestRepository,
    private readonly workbookRepository: WorkbookRepository,
    private readonly prisma: PrismaInstance,
  ) {}

  async createTest(request: CreateTestRequest, userId: number) {
    let result: TestSimpleResponse;
    await this.prisma.$transaction(async (tx) => {
      const workbooks = await this.workbookRepository.findWorkbooksByIdsWithAuthorization(
        request.workbooks.map((w) => w.workbookId),
        userId,
        tx,
      );
      if (workbooks.length !== request.workbooks.length) {
        throw new BadRequestException('유효하지 않은 문제집이 포함되었습니다.');
      }
      const countTable = new Map<number, number>();
      request.workbooks.forEach((w) => {
        countTable.set(w.workbookId, w.count);
      });
      const test = Test.new(BigInt(userId), request.title, request.minutes * 60 + request.seconds);
      test.setWorkbooks(workbooks.map((w) => WorkbookTest.new(test, w, countTable.get(Number(w.workbookId)))));
      await this.testRepository.save(test, tx);
      result = new TestSimpleResponse(test);
    });
    return result;
  }

  async searchTestsByUser(title: string, userId: number) {
    const tests = await this.testRepository.searchTestsByUser(title, userId);
    return tests.map((t) => new TestSimpleResponse(t));
  }
}
