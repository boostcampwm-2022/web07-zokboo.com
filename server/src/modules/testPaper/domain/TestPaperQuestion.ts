import Question from 'src/modules/question/domain/Question';
import { TestPaperQuestion as pTestPaperQuestion } from '@prisma/client';
import TestPaperQuestionState from '../enum/TestPaperQuestionState';
import QuestionType from 'src/modules/question/enum/QuestionType';
import { BadRequestException } from '@nestjs/common';

class TestPaperQuestion {
  public testPaperQuestionId: bigint | undefined;
  public testPaperId: bigint | undefined;
  public state: TestPaperQuestionState;
  public writtenAnswer: string;
  public review: string;
  public question: Question;

  constructor(
    testPaperQuestionId: bigint | undefined,
    testPaperId: bigint | undefined,
    isCorrect: TestPaperQuestionState,
    writtenAnswer: string,
    review: string,
    question: Question,
  ) {
    this.testPaperQuestionId = testPaperQuestionId;
    this.testPaperId = testPaperId;
    this.state = this.state;
    this.writtenAnswer = writtenAnswer;
    this.review = review;
    this.question = question;
  }

  static of(testPaperQuestion: pTestPaperQuestion, question: Question) {
    return new TestPaperQuestion(
      testPaperQuestion.test_paper_question_id,
      testPaperQuestion.test_paper_id,
      TestPaperQuestionState[testPaperQuestion.state],
      testPaperQuestion.written_answer,
      testPaperQuestion.review,
      question,
    );
  }

  static new(question: Question) {
    return new TestPaperQuestion(undefined, undefined, TestPaperQuestionState.UNMARKED, '', '', question);
  }

  setId(testPaperQuestionId: bigint) {
    this.testPaperQuestionId = testPaperQuestionId;
  }

  gradeMultipleTypeQuestion(writtenAnswer: string | undefined) {
    if (writtenAnswer === undefined) {
      throw new BadRequestException('풀리지 않은 문제가 있습니다.');
    }
    this.writtenAnswer = writtenAnswer;
    if (this.question.questionType === QuestionType.SUBJECTIVE) {
      this.state = TestPaperQuestionState.UNMARKED;
      return false;
    }
    if (this.question.answer !== writtenAnswer) {
      this.state = TestPaperQuestionState.WRONG;
      return false;
    }
    this.state = TestPaperQuestionState.CORRECT;
    return true;
  }

  markSubjectiveTypeQuestion(result: boolean | undefined) {
    if (result === undefined) {
      throw new BadRequestException('채점되지 않은 문제가 있습니다.');
    }
    if (result) {
      this.state = TestPaperQuestionState.CORRECT;
      return true;
    }
    this.state = TestPaperQuestionState.WRONG;
    return false;
  }
}

export default TestPaperQuestion;
