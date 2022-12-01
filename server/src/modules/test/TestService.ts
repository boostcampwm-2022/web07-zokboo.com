import { BadRequestException, Injectable } from '@nestjs/common';
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
  ) {}

  async createTest(request: CreateTestRequest, userId: number) {
    const workbooks = await this.workbookRepository.findWorkbooksByIdsWithAuthorization(
      request.workbooks.map((w) => w.workbookId),
      userId,
    );
    if (workbooks.length !== request.workbooks.length) {
      throw new BadRequestException('유효하지 않은 문제집이 포함되었습니다.');
    }
    const countTable = new Map<number, number>();
    request.workbooks.forEach((w) => {
      countTable.set(w.workbookId, w.count);
    });
    const test = Test.new(BigInt(userId), request.timeout);
    test.setWorkbooks(workbooks.map((w) => WorkbookTest.new(w, countTable.get(Number(w.workbookId)))));
    await this.testRepository.save(test);
    return new TestSimpleResponse(test);
  }
}
