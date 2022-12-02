import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaInstance } from '../common/PrismaInstance';
import Workbook from '../workbook/domain/Workbook';
import Test from './domain/Test';
import WorkbookTest from './domain/WorkbookTest';

@Injectable()
export class TestRepository {
  constructor(private readonly prismaInstance: PrismaInstance) {}

  async save(test: Test, tx?: Prisma.TransactionClient) {
    if (test.testId) {
      return await this.update(test, tx);
    }
    return await this.create(test, tx);
  }

  async update(test: Test, tx?: Prisma.TransactionClient) {
    const prisma = tx ? tx : this.prismaInstance;
    await prisma.test.update({
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

  async create(test: Test, tx?: Prisma.TransactionClient) {
    const prisma = tx ? tx : this.prismaInstance;
    const newTest = await prisma.test.create({
      data: {
        title: test.title,
        total_count: test.totalCount,
        user_id: test.userId,
        timeout: test.timeout,
        created_at: test.createdAt,
        updated_at: test.updatedAt,
        WorkbookTest: {
          create: test.workbooks.map((w) => {
            return {
              workbook_id: w.workbook.workbookId,
              count: w.count,
            };
          }),
        },
      },
      include: {
        WorkbookTest: {
          include: {
            Workbook: true,
          },
        },
      },
    });
    test.setId(newTest.test_id);
    test.setWorkbooks(newTest.WorkbookTest.map((w) => WorkbookTest.of(w, Workbook.of(w.Workbook))));
    return test;
  }
}
