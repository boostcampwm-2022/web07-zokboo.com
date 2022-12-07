import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaInstance } from '../common/PrismaInstance';
import Question from '../question/domain/Question';
import Workbook from '../workbook/domain/Workbook';
import WorkbookQuestion from '../workbook/domain/WorkbookQuestion';
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
            Workbook: {
              include: {
                WorkbookQuestion: {
                  include: {
                    Question: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    test.setId(newTest.test_id);
    test.setWorkbooks(
      newTest.WorkbookTest.map((w) => {
        const workbook = Workbook.of(w.Workbook);
        workbook.setQuestions(
          w.Workbook.WorkbookQuestion.map((wq) => WorkbookQuestion.of(wq, Question.of(wq.Question))),
        );
        return WorkbookTest.of(w, workbook);
      }),
    );
    return test;
  }

  async createWorkbookTest(testId: bigint, workbookTest: WorkbookTest, tx?: Prisma.TransactionClient) {
    const prisma = tx ? tx : this.prismaInstance;
    const newWorkbookTest = await prisma.workbookTest.create({
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

  async findTestWithAll(testId: number, tx?: Prisma.TransactionClient) {
    const prisma = tx ? tx : this.prismaInstance;
    const test = await prisma.test.findUnique({
      where: {
        test_id: testId,
      },
      include: {
        WorkbookTest: {
          include: {
            Workbook: {
              include: {
                WorkbookQuestion: {
                  include: {
                    Question: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    const result = Test.of(test);
    result.setWorkbooks(
      test.WorkbookTest.map((wt) => {
        const workbook = Workbook.of(wt.Workbook);
        workbook.setQuestions(
          wt.Workbook.WorkbookQuestion.map((wq) => WorkbookQuestion.of(wq, Question.of(wq.Question))),
        );
        return WorkbookTest.of(wt, workbook);
      }),
    );
    return result;
  }
}
