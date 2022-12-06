import Test from 'src/modules/test/domain/Test';
import TestPaperQuestion from './TestPaperQuestion';

class TestPaper {
  public testPaperId: bigint;
  public correctCount: number;
  public isCompleted: boolean;
  public test: Test;
  public questions: TestPaperQuestion[];
  public createdAt: Date;
  public updatedAt: Date;

  constructor(
    testPaperId: bigint,
    correctCount: number,
    isCompleted: boolean,
    test: Test,
    questions: TestPaperQuestion[],
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.testPaperId = testPaperId;
    this.correctCount = correctCount;
    this.isCompleted = isCompleted;
    this.test = test;
    this.questions = questions;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  setId(testPaperId: bigint) {
    this.testPaperId = testPaperId;
  }

  setQuestions(questions: TestPaperQuestion[]) {
    this.questions = questions;
  }
}
