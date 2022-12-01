import { Injectable } from '@nestjs/common';
import { PrismaInstance } from '../common/PrismaInstance';
import Test from './domain/Test';
import WorkbookTest from './domain/WorkbookTest';

@Injectable()
export class TestRepository {
  constructor(private readonly prisma: PrismaInstance) {}

  async save(test: Test) {
    if (test.testId) {
      return await this.update(test);
    }
    return await this.create(test);
  }

  async update(test: Test) {
    await this.prisma.test.update({
      where: {
        test_id: test.testId,
      },
      data: {
        title: test.title,
        timeout: test.timeout,
        total_count: test.totalCount,
        updated_at: test.updatedAt,
      },
    });
  }

  async create(test: Test) {
    const newTest = await this.prisma.test.create({
      data: {
        title: test.title,
        total_count: test.totalCount,
        user_id: test.userId,
        timeout: test.timeout,
        created_at: test.createdAt,
        updated_at: test.updatedAt,
      },
    });
    test.setId(newTest.test_id);
    test.workbooks.forEach(async (w) => {
      await this.createWorkbookTest(newTest.test_id, w);
    });
    return test;
  }

  async createWorkbookTest(testId: bigint, workbookTest: WorkbookTest) {
    const newWorkbookTest = await this.prisma.workbookTest.create({
      data: {
        test_id: testId,
        workbook_id: workbookTest.workbook.workbookId,
        count: workbookTest.count,
      },
    });
    workbookTest.setId(newWorkbookTest.workbook_test_id);
    workbookTest.setTestId(testId);
    return workbookTest;
  }
}
