import { BadRequestException } from '@nestjs/common';
import { Workbook as pWorkbook } from '@prisma/client';
import WorkbookQuestion from './WorkbookQuestion';

class Workbook {
  public workbookId: bigint | undefined;
  public title: string;
  public description: string;
  public isPublic: boolean;
  public userId: bigint;
  public originalId: bigint | undefined;
  public questions: WorkbookQuestion[] | undefined;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(
    workbookId: bigint | undefined,
    title: string,
    description: string,
    isPublic: boolean,
    userId: bigint,
    originalId: bigint | undefined,
    questions: WorkbookQuestion[] | undefined,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.workbookId = workbookId;
    this.title = title;
    this.description = description;
    this.isPublic = isPublic;
    this.userId = userId;
    this.originalId = originalId;
    this.questions = questions;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static of(record: pWorkbook) {
    return new Workbook(
      record.workbook_id,
      record.title,
      record.description,
      record.is_public,
      record.user_id,
      record.original_id,
      undefined,
      record.created_at,
      record.updated_at,
    );
  }

  static new(title: string, description: string, isPublic: boolean, userId: number) {
    const now = new Date();
    return new Workbook(undefined, title, description, isPublic, BigInt(userId), undefined, undefined, now, now);
  }

  static duplicate(workbook: Workbook, userId: number) {
    if (!workbook.isPublic) {
      throw new BadRequestException('Private 문제집을 복사할 수 없습니다.');
    }
    const now = new Date();
    return new Workbook(
      undefined,
      workbook.title,
      workbook.description,
      workbook.isPublic,
      BigInt(userId),
      workbook.originalId || workbook.workbookId,
      undefined,
      now,
      now,
    );
  }

  setId(workbookId: bigint) {
    this.workbookId = workbookId;
  }

  setQuestions(questions: WorkbookQuestion[]) {
    if (questions.length < 5 || questions.length > 50) {
      throw new BadRequestException('문제집에 포함될 수 있는 문제 수는 5개에서 50개 입니다.');
    }
    this.questions = questions;
  }
}

export default Workbook;
