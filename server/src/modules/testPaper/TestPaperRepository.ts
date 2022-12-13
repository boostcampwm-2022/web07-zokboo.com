import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaInstance } from '../common/PrismaInstance';
import Hashtag from '../question/domain/Hashtag';
import Option from '../question/domain/Option';
import Question from '../question/domain/Question';
import QuestionImage from '../question/domain/QuestionImage';
import QuestionType from '../question/enum/QuestionType';
import Test from '../test/domain/Test';
import WorkbookTest from '../test/domain/WorkbookTest';
import Workbook from '../workbook/domain/Workbook';
import WorkbookQuestion from '../workbook/domain/WorkbookQuestion';
import TestPaper from './domain/TestPaper';
import TestPaperQuestion from './domain/TestPaperQuestion';
import TestPaperState from './enum/TestPaperState';

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
        state: testPaper.state,
        created_at: testPaper.createdAt,
        updated_at: testPaper.updatedAt,
        TestPaperQuestion: {
          create: testPaper.questions.map((q) => {
            return {
              question_id: q.question.questionId,
              written_answer: q.writtenAnswer,
              state: q.state,
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
        state: testPaper.state,
        correct_count: testPaper.correctCount,
        updated_at: testPaper.updatedAt,
      },
    });
    for (const testPaperQuestion of testPaper.questions) {
      await this.updateTestPaperQuestion(testPaperQuestion, tx);
    }
    return testPaper;
  }

  async updateTestPaperQuestion(testPaperQuestion: TestPaperQuestion, tx?: Prisma.TransactionClient) {
    const prisma = tx ? tx : this.prismaInstance;
    await prisma.testPaperQuestion.update({
      where: {
        test_paper_question_id: testPaperQuestion.testPaperQuestionId,
      },
      data: {
        written_answer: testPaperQuestion.writtenAnswer,
        review: testPaperQuestion.review,
        state: testPaperQuestion.state,
      },
    });
    return testPaperQuestion;
  }

  async findTestPaperWithDetails(testPaperId: number, tx?: Prisma.TransactionClient) {
    const prisma = tx ? tx : this.prismaInstance;
    const testPaper = await prisma.testPaper.findUnique({
      where: {
        test_paper_id: testPaperId,
      },
      include: {
        Test: {
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
        },
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
    test.setWorkbooks(
      testPaper.Test.WorkbookTest.map((wt) => {
        const workbook = Workbook.of(wt.Workbook);
        workbook.setQuestions(
          wt.Workbook.WorkbookQuestion.map((wq) => WorkbookQuestion.of(wq, Question.of(wq.Question))),
        );
        return WorkbookTest.of(wt, workbook);
      }),
    );
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

  async findTestPapersOfUser(userId: number, state: TestPaperState, tx?: Prisma.TransactionClient) {
    const prisma = tx ? tx : this.prismaInstance;
    const testPapers = await prisma.testPaper.findMany({
      where: {
        Test: {
          user_id: userId,
        },
        state: state,
      },
      include: {
        Test: {
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
        },
      },
    });
    return testPapers.map((tp) => {
      const test = Test.of(tp.Test);
      test.setWorkbooks(
        tp.Test.WorkbookTest.map((wt) => {
          const workbook = Workbook.of(wt.Workbook);
          workbook.setQuestions(
            wt.Workbook.WorkbookQuestion.map((wq) => WorkbookQuestion.of(wq, Question.of(wq.Question))),
          );
          return WorkbookTest.of(wt, workbook);
        }),
      );
      return TestPaper.of(tp, test);
    });
  }

  async findTestPaperQuestion(testPaperQuestionId: number, tx?: Prisma.TransactionClient) {
    const prisma = tx ? tx : this.prismaInstance;
    const testPaperQuestion = await prisma.testPaperQuestion.findUnique({
      where: {
        test_paper_question_id: testPaperQuestionId,
      },
      include: {
        TestPaper: {
          include: {
            Test: true,
          },
        },
        Question: true,
      },
    });
    if (!testPaperQuestion) {
      return null;
    }
    const result = TestPaperQuestion.of(testPaperQuestion, Question.of(testPaperQuestion.Question));
    result.setTestPaper(TestPaper.of(testPaperQuestion.TestPaper, Test.of(testPaperQuestion.TestPaper.Test)));
    return result;
  }
}
