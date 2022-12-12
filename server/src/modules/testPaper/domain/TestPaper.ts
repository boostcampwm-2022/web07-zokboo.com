import Test from 'src/modules/test/domain/Test';
import TestPaperQuestion from './TestPaperQuestion';
import { TestPaper as pTestPaper } from '@prisma/client';

class TestPaper {
  public testPaperId: bigint;
  public title: string;
  public timeout: number;
  public correctCount: number;
  public isCompleted: boolean;
  public test: Test;
  public questions: TestPaperQuestion[];
  public createdAt: Date;
  public updatedAt: Date;

  constructor(
    testPaperId: bigint,
    title: string,
    timeout: number,
    correctCount: number,
    isCompleted: boolean,
    test: Test,
    questions: TestPaperQuestion[],
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.testPaperId = testPaperId;
    this.title = title;
    this.timeout = timeout;
    this.correctCount = correctCount;
    this.isCompleted = isCompleted;
    this.test = test;
    this.questions = questions;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static of(record: pTestPaper, test: Test) {
    return new TestPaper(
      record.test_paper_id,
      record.title,
      record.timeout,
      record.correct_count,
      record.is_completed,
      test,
      [],
      record.created_at,
      record.updated_at,
    );
  }

  static new(title: string, test: Test) {
    const now = new Date();
    return new TestPaper(undefined, title, test.timeout, 0, false, test, undefined, now, now);
  }

  setId(testPaperId: bigint) {
    this.testPaperId = testPaperId;
  }

  setQuestions(questions: TestPaperQuestion[]) {
    this.questions = questions;
  }
}

export default TestPaper;
