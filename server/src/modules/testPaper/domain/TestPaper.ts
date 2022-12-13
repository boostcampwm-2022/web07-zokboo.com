import Test from 'src/modules/test/domain/Test';
import TestPaperQuestion from './TestPaperQuestion';
import { TestPaper as pTestPaper } from '@prisma/client';
import TestPaperState from '../enum/TestPaperState';
import QuestionType from 'src/modules/question/enum/QuestionType';

class TestPaper {
  public testPaperId: bigint;
  public title: string;
  public timeout: number;
  public correctCount: number;
  public state: TestPaperState;
  public test: Test;
  public questions: TestPaperQuestion[];
  public createdAt: Date;
  public updatedAt: Date;

  constructor(
    testPaperId: bigint,
    title: string,
    timeout: number,
    correctCount: number,
    state: TestPaperState,
    test: Test,
    questions: TestPaperQuestion[],
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.testPaperId = testPaperId;
    this.title = title;
    this.timeout = timeout;
    this.correctCount = correctCount;
    this.state = state;
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
      TestPaperState[record.state],
      test,
      [],
      record.created_at,
      record.updated_at,
    );
  }

  static new(title: string, test: Test) {
    const now = new Date();
    return new TestPaper(undefined, title, test.timeout, 0, TestPaperState.SOLVING, test, undefined, now, now);
  }

  setId(testPaperId: bigint) {
    this.testPaperId = testPaperId;
  }

  setQuestions(questions: TestPaperQuestion[]) {
    this.questions = questions;
  }

  gradeMultipleTypeQuestions(writtenAnswers: Map<bigint, string>) {
    let gradeCount = 0;
    this.correctCount = 0;
    this.questions.forEach((q) => {
      if (q.question.questionType === QuestionType.SUBJECTIVE) {
        return;
      }
      if (q.gradeMultipleTypeQuestion()) {
        this.correctCount += 1;
      }
      gradeCount += 1;
    });
    this.updatedAt = new Date();
    if (gradeCount < this.questions.length) {
      this.state = TestPaperState.GRADING;
      return;
    }
    this.state = TestPaperState.COMPLETE;
    return;
  }

  markSubjectiveTypeQuestions(correctResults: Map<bigint, boolean>) {
    this.questions.forEach((q) => {
      if (q.question.questionType === QuestionType.MULTIPLE) {
        return;
      }
      if (q.markSubjectiveTypeQuestion(correctResults.get(q.testPaperQuestionId))) {
        this.correctCount += 1;
      }
    });
    this.state = TestPaperState.COMPLETE;
    return;
  }
}

export default TestPaper;
