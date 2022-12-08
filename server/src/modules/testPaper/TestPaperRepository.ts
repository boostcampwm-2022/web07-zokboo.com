import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaInstance } from '../common/PrismaInstance';
import Hashtag from '../question/domain/Hashtag';
import Option from '../question/domain/Option';
import Question from '../question/domain/Question';
import QuestionImage from '../question/domain/QuestionImage';
import QuestionType from '../question/enum/QuestionType';
import Test from '../test/domain/Test';
import TestPaper from './domain/TestPaper';
import TestPaperQuestion from './domain/TestPaperQuestion';

@Injectable()
export class TestPaperRepository {
  constructor(private readonly prismaInstance: PrismaInstance) {}

  async save(testPaper: TestPaper, tx?: Prisma.TransactionClient) {
    if (testPaper.testPaperId) {
      return await this.update(testPaper, tx);
    }
    return await this.create(testPaper, tx);
  }

  async create(testPaper: TestPaper, tx?: Prisma.TransactionClient) {
    const prisma = tx ? tx : this.prismaInstance;
    const newTestPaper = await prisma.testPaper.create({
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
    await prisma.testPaper.update({
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

  async findTestPaperWithDetails(testPaperId: number, tx?: Prisma.TransactionClient) {
    const prisma = tx ? tx : this.prismaInstance;
    const testPaper = await prisma.testPaper.findUnique({
      where: {
        test_paper_id: testPaperId,
      },
      include: {
        Test: true,
        TestPaperQuestion: {
          include: {
            Question: {
              include: {
                QuestionImage: true,
                Option: true,
                QuestionHashtag: {
                  include: {
                    Hashtag: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    if (!testPaper) {
      return null;
    }
    const test = Test.of(testPaper.Test);
    const result = TestPaper.of(testPaper, test);
    result.setQuestions(
      testPaper.TestPaperQuestion.map((tpq) => {
        const question = Question.of(tpq.Question);
        question.setImages(tpq.Question.QuestionImage.map((i) => QuestionImage.of(i)));
        question.setHashtags(tpq.Question.QuestionHashtag.map((h) => Hashtag.of(h.Hashtag)));
        if (question.questionType === QuestionType.MULTIPLE) {
          question.setOptions(tpq.Question.Option.map((o) => Option.of(o)));
        }
        return TestPaperQuestion.of(tpq, question);
      }),
    );
    return result;
  }
}
