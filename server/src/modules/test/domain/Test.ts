import WorkbookTest from './WorkbookTest';
import { Test as pTest } from '@prisma/client';
import { BadRequestException } from '@nestjs/common';

class Test {
  public testId: bigint | undefined;
  public title: string;
  public totalCount: number;
  public userId: bigint;
  public timeout: number;
  public createdAt: Date;
  public updatedAt: Date;
  public workbooks: WorkbookTest[];

  constructor(
    testId: bigint | undefined,
    title: string,
    totalCount: number,
    userId: bigint,
    timeout: number,
    workbooks: WorkbookTest[],
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.testId = testId;
    this.title = title;
    this.totalCount = totalCount;
    this.userId = userId;
    this.timeout = timeout;
    this.workbooks = workbooks;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static of(record: pTest) {
    return new Test(
      record.test_id,
      record.title,
      record.total_count,
      record.user_id,
      record.timeout,
      undefined,
      record.created_at,
      record.updated_at,
    );
  }

  static new(userId: bigint, title: string, timeout: number) {
    const now = new Date();
    return new Test(undefined, title, 0, userId, timeout, [], now, now);
  }

  setWorkbooks(workbooks: WorkbookTest[]) {
    console.log(workbooks);
    if (workbooks.length < 1) {
      throw new BadRequestException('시험은 최소 한개의 문제집에서부터 문제를 가져와야 합니다.');
    }
    this.workbooks = workbooks;
    this.totalCount = workbooks.reduce((acc, cur) => acc + cur.count, 0);
  }

  setId(testId: bigint) {
    this.testId = testId;
  }
}
export default Test;
