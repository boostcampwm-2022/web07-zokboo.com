import { Workbook as pWorkbook } from '@prisma/client';

class Workbook {
  public workbookId: bigint | undefined;
  public title: string;
  public description: string;
  public isPublic: boolean;
  public userId: bigint;
  public originalId: bigint | undefined;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(
    workbookId: bigint | undefined,
    title: string,
    description: string,
    isPublic: boolean,
    userId: bigint,
    originalId: bigint | undefined,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.workbookId = workbookId;
    this.title = title;
    this.description = description;
    this.isPublic = isPublic;
    this.userId = userId;
    this.originalId = originalId;
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
      record.created_at,
      record.updated_at,
    );
  }
}

export default Workbook;
