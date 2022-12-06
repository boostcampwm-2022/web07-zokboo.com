import Question from 'src/modules/question/domain/Question';

class TestPaperQuestion {
  public testPaperQuestionId: bigint | undefined;
  public testPaperId: bigint | undefined;
  public isCorrect: boolean;
  public writtenAnswer: string;
  public question: Question;

  constructor(
    testPaperQuestionId: bigint | undefined,
    testPaperId: bigint | undefined,
    isCorrect: boolean,
    writtenAnswer: string,
    question: Question,
  ) {
    this.testPaperQuestionId = testPaperQuestionId;
    this.testPaperId = testPaperId;
    this.isCorrect = isCorrect;
    this.writtenAnswer = writtenAnswer;
    this.question = question;
  }
}

export default TestPaperQuestion;
