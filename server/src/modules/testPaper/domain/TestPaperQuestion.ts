import Question from 'src/modules/question/domain/Question';
import { TestPaperQuestion as pTestPaperQuestion } from '@prisma/client';
import TestPaperQuestionState from '../enum/TestPaperQuestionState';
import QuestionType from 'src/modules/question/enum/QuestionType';
import TestPaper from './TestPaper';

class TestPaperQuestion {
  public testPaperQuestionId: bigint | undefined;
  public testPaperId: bigint | undefined;
  public state: TestPaperQuestionState;
  public writtenAnswer: string;
  public review: string;
  public question: Question;
  public testPaper: TestPaper;

  constructor(
    testPaperQuestionId: bigint | undefined,
    testPaperId: bigint | undefined,
    state: TestPaperQuestionState,
    writtenAnswer: string,
    review: string,
    question: Question,
    testPaper: TestPaper,
  ) {
    this.testPaperQuestionId = testPaperQuestionId;
    this.testPaperId = testPaperId;
    this.state = state;
    this.writtenAnswer = writtenAnswer;
    this.review = review;
    this.question = question;
    this.testPaper = testPaper;
  }

  static of(testPaperQuestion: pTestPaperQuestion, question: Question) {
    return new TestPaperQuestion(
      testPaperQuestion.test_paper_question_id,
      testPaperQuestion.test_paper_id,
      TestPaperQuestionState[testPaperQuestion.state],
      testPaperQuestion.written_answer,
      testPaperQuestion.review,
      question,
      undefined,
    );
  }

  static new(question: Question) {
    return new TestPaperQuestion(undefined, undefined, TestPaperQuestionState.UNMARKED, '', '', question, undefined);
  }

  setId(testPaperQuestionId: bigint) {
    this.testPaperQuestionId = testPaperQuestionId;
  }

  setTestPaper(testPaper: TestPaper) {
    this.testPaper = testPaper;
  }

  solve(writtenAnswer: string | undefined) {
    if (writtenAnswer === undefined) {
      this.writtenAnswer = '';
      return;
    }
    this.writtenAnswer = writtenAnswer;
  }

  gradeMultipleTypeQuestion() {
    if (this.question.questionType === QuestionType.SUBJECTIVE) {
      this.state = TestPaperQuestionState.UNMARKED;
      return false;
    }
    if (this.question.answer !== this.writtenAnswer) {
      this.state = TestPaperQuestionState.WRONG;
      return false;
    }
    this.state = TestPaperQuestionState.CORRECT;
    return true;
  }

  markSubjectiveTypeQuestion(result: boolean | undefined) {
    if (result) {
      this.state = TestPaperQuestionState.CORRECT;
      return true;
    }
    this.state = TestPaperQuestionState.WRONG;
    return false;
  }

  reviewQuestion(content: string) {
    this.review = content;
  }
}

export default TestPaperQuestion;
