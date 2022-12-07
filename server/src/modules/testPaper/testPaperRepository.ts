import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaInstance } from '../common/PrismaInstance';
import Question from '../question/domain/Question';
import TestPaper from './domain/testPaper';
import TestPaperQuestion from './domain/TestPaperQuestion';

@Injectable()
export class TestPaperRepository {
  constructor(private readonly prismaInstance: PrismaInstance) {}

  async save(testPaper: TestPaper, tx?: Prisma.TransactionClient) {
    const prisma = tx ? tx : this.prismaInstance;
    if (testPaper.testPaperId) {
      return await this.update(testPaper, tx);
    }
    return await this.create(testPaper, tx);
  }

  async create(testPaper: TestPaper, tx?: Prisma.TransactionClient) {
    const prisma = tx ? tx : this.prismaInstance;
    const newTestPaper = await tx.testPaper.create({
      data: {
        test_id: testPaper.test.testId,
        title: testPaper.title,
        timeout: testPaper.timeout,
        correct_count: testPaper.correctCount,
        is_completed: testPaper.isCompleted,
        created_at: testPaper.createdAt,
        updated_at: testPaper.updatedAt,
        TestPaperQuestion: {
          create: testPaper.questions.map((q) => {
            return {
              question_id: q.question.questionId,
              written_answer: q.writtenAnswer,
              is_correct: q.isCorrect,
              review: q.review,
            };
          }),
        },
      },
      include: {
        TestPaperQuestion: {
          include: {
            Question: true,
          },
        },
      },
    });
    testPaper.setId(newTestPaper.test_paper_id);
    testPaper.setQuestions(
      newTestPaper.TestPaperQuestion.map((tpq) => TestPaperQuestion.of(tpq, Question.of(tpq.Question))),
    );
    return testPaper;
  }

  async update(testPaper: TestPaper, tx?: Prisma.TransactionClient) {
    const prisma = tx ? tx : this.prismaInstance;
    await tx.testPaper.update({
      where: {
        test_paper_id: testPaper.testPaperId,
      },
      data: {
        title: testPaper.title,
        is_completed: testPaper.isCompleted,
        correct_count: testPaper.correctCount,
        updated_at: testPaper.updatedAt,
      },
    });
    return testPaper;
  }
}
