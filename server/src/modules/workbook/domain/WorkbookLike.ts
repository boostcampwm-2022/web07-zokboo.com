import { WorkbookLike as pWorkbookLike } from '@prisma/client';

class WorkbookLike {
  public workbookId: bigint;
  public userId: bigint;

  constructor(workbookId: bigint, userId: bigint) {
    this.workbookId = workbookId;
    this.userId = userId;
  }

  static new(workbookId: bigint, userId: bigint) {
    return new WorkbookLike(userId, workbookId);
  }

  static of(record: pWorkbookLike) {
    return new WorkbookLike(record.workbook_id, record.user_id);
  }
}

export default WorkbookLike;
