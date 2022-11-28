import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaInstance } from '../common/PrismaInstance';
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

  async findWorkbookById(workbookId: bigint) {
    const workbook = await this.prisma.workbook.findUnique({
      where: {
        workbook_id: workbookId,
      },
    });

    return Workbook.of(workbook);
  }
}
