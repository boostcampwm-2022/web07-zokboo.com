import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaInstance } from '../common/PrismaInstance';
import Hashtag from '../question/domain/Hashtag';
import Option from '../question/domain/Option';
import Question from '../question/domain/Question';
import QuestionImage from '../question/domain/QuestionImage';
import Workbook from './domain/Workbook';
import WorkbookQuestion from './domain/WorkbookQuestion';

@Injectable()
export class WorkbookRepository {
  constructor(private readonly prisma: PrismaInstance) {}

  async save(workbook: Workbook) {
    if (workbook.workbookId) {
      return await this.update(workbook);
    }
    return await this.create(workbook);
  }

  async update(workbook: Workbook) {
    await this.prisma.workbook.update({
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

  async create(workbook: Workbook) {
    if (workbook.questions === undefined) {
      throw new BadRequestException('문제 없는 문제집은 만들 수 없습니다.');
    }
    const newWorkbook = await this.prisma.workbook.create({
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
      await this.createWorkbookQuestion(workbook.workbookId, question);
    });
    return workbook;
  }

  async createWorkbookQuestion(workbookId: bigint, workbookQuestion: WorkbookQuestion) {
    const newWorkbookQuestion = await this.prisma.workbookQuestion.create({
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

  async findWorkbook(workbookId: number) {
    const workbook = await this.prisma.workbook.findUnique({
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
}