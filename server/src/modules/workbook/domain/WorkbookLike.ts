import { WorkbookLike as pWorkbookLike } from '@prisma/client';

class WorkbookLike {
  public userId: bigint;
  public workbookId: bigint;

  constructor(userId: bigint, workbookId: bigint) {
    this.userId = userId;
    this.workbookId = workbookId;
  }

  static new(userId: bigint, workbookId: bigint) {
    return new WorkbookLike(userId, workbookId);
  }

  static of(record: pWorkbookLike) {
    return new WorkbookLike(record.user_id, record.workbook_id);
  }
}

export default WorkbookLike;
