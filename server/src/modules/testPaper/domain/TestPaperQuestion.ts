import Question from 'src/modules/question/domain/Question';
import { TestPaperQuestion as pTestPaperQuestion } from '@prisma/client';

class TestPaperQuestion {
  public testPaperQuestionId: bigint | undefined;
  public testPaperId: bigint | undefined;
  public isCorrect: boolean;
  public writtenAnswer: string;
  public review: string;
  public question: Question;

  constructor(
    testPaperQuestionId: bigint | undefined,
    testPaperId: bigint | undefined,
    isCorrect: boolean,
    writtenAnswer: string,
    review: string,
    question: Question,
  ) {
    this.testPaperQuestionId = testPaperQuestionId;
    this.testPaperId = testPaperId;
    this.isCorrect = isCorrect;
    this.writtenAnswer = writtenAnswer;
    this.review = review;
    this.question = question;
  }

  static of(testPaperQuestion: pTestPaperQuestion, question: Question) {
    return new TestPaperQuestion(
      testPaperQuestion.test_paper_question_id,
      testPaperQuestion.test_paper_id,
      testPaperQuestion.is_correct,
      testPaperQuestion.written_answer,
      testPaperQuestion.review,
      question,
    );
  }

  static new(question: Question) {
    return new TestPaperQuestion(undefined, undefined, false, '', '', question);
  }

  setId(testPaperQuestionId: bigint) {
    this.testPaperQuestionId = testPaperQuestionId;
  }
}

export default TestPaperQuestion;
