import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaInstance } from '../common/PrismaInstance';
import Hashtag from '../question/domain/Hashtag';
import Option from '../question/domain/Option';
import Question from '../question/domain/Question';
import QuestionImage from '../question/domain/QuestionImage';
import Workbook from './domain/Workbook';
import WorkbookQuestion from './domain/WorkbookQuestion';

@Injectable()
export class WorkbookRepository {
  constructor(private readonly prismaInstance: PrismaInstance) {}

  async save(workbook: Workbook, tx?: Prisma.TransactionClient) {
    if (workbook.workbookId) {
      return await this.update(workbook, tx);
    }
    return await this.create(workbook, tx);
  }

  async update(workbook: Workbook, tx?: Prisma.TransactionClient) {
    const prisma = tx ? tx : this.prismaInstance;
    await prisma.workbook.update({
      where: {
        workbook_id: workbook.workbookId,
      },
      data: {
        title: workbook.title,
        description: workbook.description,
        is_public: workbook.isPublic,
        updated_at: workbook.updatedAt,
      },
    });
    return workbook;
  }

  async create(workbook: Workbook, tx?: Prisma.TransactionClient) {
    const prisma = tx ? tx : this.prismaInstance;
    if (workbook.questions === undefined) {
      throw new BadRequestException('문제 없는 문제집은 만들 수 없습니다.');
    }
    const newWorkbook = await prisma.workbook.create({
      data: {
        title: workbook.title,
        description: workbook.description,
        is_public: workbook.isPublic,
        user_id: workbook.userId,
        original_id: workbook.originalId,
        created_at: workbook.createdAt,
        updated_at: workbook.updatedAt,
      },
    });
    workbook.setId(newWorkbook.workbook_id);
    workbook.questions.forEach(async (question) => {
      await this.createWorkbookQuestion(workbook.workbookId, question, tx);
    });
    return workbook;
  }

  async createWorkbookQuestion(workbookId: bigint, workbookQuestion: WorkbookQuestion, tx?: Prisma.TransactionClient) {
    const prisma = tx ? tx : this.prismaInstance;
    const newWorkbookQuestion = await prisma.workbookQuestion.create({
      data: {
        workbook_id: workbookId,
        question_id: workbookQuestion.question.questionId,
        written_answer: workbookQuestion.writtenAnswer,
      },
    });
    workbookQuestion.setWorkbookId(workbookId);
    workbookQuestion.setId(newWorkbookQuestion.workbook_question_id);
    return workbookQuestion;
  }

  async updateWorkbookQuestion(workbookQuestion: WorkbookQuestion, tx?: Prisma.TransactionClient) {
    const prisma = tx ? tx : this.prismaInstance;
    await prisma.workbookQuestion.update({
      where: {
        workbook_question_id: workbookQuestion.workbookQuestionId,
      },
      data: {
        written_answer: workbookQuestion.writtenAnswer,
      },
    });
    return workbookQuestion;
  }

  async searchWorkbooks(title: string, content: string, tx?: Prisma.TransactionClient) {
    const prisma = tx ? tx : this.prismaInstance;
    const workbooks = await prisma.workbook.findMany({
      where: {
        title: {
          search: title,
        },
        description: {
          search: content,
        },
        is_public: true,
      },
      include: {
        WorkbookQuestion: {
          include: {
            Question: true,
          },
        },
      },
    });
    return workbooks.map((w) => {
      const questions = w.WorkbookQuestion.map((wq) => WorkbookQuestion.of(wq, Question.of(wq.Question)));
      const workbook = Workbook.of(w);
      workbook.setQuestions(questions);
      return workbook;
    });
  }

  async findOnlyWorkbook(workbookId: number, tx?: Prisma.TransactionClient) {
    const prisma = tx ? tx : this.prismaInstance;
    const workbook = await prisma.workbook.findUnique({
      where: {
        workbook_id: workbookId,
      },
    });
    return Workbook.of(workbook);
  }

  async findWorkbook(workbookId: number, tx?: Prisma.TransactionClient) {
    const prisma = tx ? tx : this.prismaInstance;
    const workbook = await prisma.workbook.findUnique({
      where: {
        workbook_id: workbookId,
      },
      include: {
        WorkbookQuestion: {
          include: {
            Question: {
              include: {
                Option: true,
                QuestionImage: true,
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
    if (!workbook) {
      return null;
    }
    const questions = workbook.WorkbookQuestion.map((wq) => {
      const question = Question.of(wq.Question);
      question.setOptions(wq.Question.Option.map((o) => Option.of(o)));
      question.setImages(wq.Question.QuestionImage.map((i) => QuestionImage.of(i)));
      question.setHashtags(wq.Question.QuestionHashtag.map((qh) => Hashtag.of(qh.Hashtag)));
      return WorkbookQuestion.of(wq, question);
    });
    const response = Workbook.of(workbook);
    response.setQuestions(questions);
    return response;
  }

  async findWorkbookQuestion(workbookQuestionId: number, tx?: Prisma.TransactionClient) {
    const prisma = tx ? tx : this.prismaInstance;
    const workbookQuestion = await prisma.workbookQuestion.findUnique({
      where: {
        workbook_question_id: workbookQuestionId,
      },
      include: {
        Question: true,
      },
    });
    if (!workbookQuestion) {
      return null;
    }
    return WorkbookQuestion.of(workbookQuestion, Question.of(workbookQuestion.Question));
  }

  async findWorkbooksByIds(workbookIds: number[], tx?: Prisma.TransactionClient) {
    const prisma = tx ? tx : this.prismaInstance;
    const workbooks = await prisma.workbook.findMany({
      where: {
        workbook_id: {
          in: workbookIds,
        },
      },
    });
    return workbooks.map((w) => Workbook.of(w));
  }

  async findWorkbooksByIdsWithAuthorization(workbookIds: number[], userId: number, tx?: Prisma.TransactionClient) {
    const prisma = tx ? tx : this.prismaInstance;
    const workbooks = await prisma.workbook.findMany({
      where: {
        workbook_id: {
          in: workbookIds,
        },
        user_id: userId,
      },
    });
    return workbooks.map((w) => Workbook.of(w));
  }
}
