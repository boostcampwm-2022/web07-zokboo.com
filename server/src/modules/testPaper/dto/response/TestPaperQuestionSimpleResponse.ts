import { ApiProperty } from '@nestjs/swagger';
import QuestionType from 'src/modules/question/enum/QuestionType';
import TestPaperQuestion from '../../domain/TestPaperQuestion';

class TestPaperQuestionSimpleResponse {
  @ApiProperty()
  public testPaperQuestionId: number;

  @ApiProperty()
  public questionId: number;

  @ApiProperty()
  public question: string;

  @ApiProperty()
  public difficulty: number;

  @ApiProperty({
    enum: QuestionType,
    enumName: 'Question Type',
  })
  public questionType: QuestionType;

  @ApiProperty()
  public images: string[];

  @ApiProperty()
  public options: string[] | undefined;

  @ApiProperty()
  public hashtags: string[];

  @ApiProperty()
  public writtenAnswer: string;

  constructor(testPaperQuestion: TestPaperQuestion) {
    this.testPaperQuestionId = Number(testPaperQuestion.testPaperQuestionId);
    this.questionId = Number(testPaperQuestion.question.questionId);
    this.question = testPaperQuestion.question.question;
    this.difficulty = testPaperQuestion.question.difficulty;
    this.questionType = testPaperQuestion.question.questionType;
    this.images = testPaperQuestion.question.images.map((i) => i.path);
    if (testPaperQuestion.question.questionType === QuestionType.MULTIPLE) {
      this.options = testPaperQuestion.question.options.map((o) => o.content);
    }
    this.hashtags = testPaperQuestion.question.hashtags.map((h) => h.name);
    this.writtenAnswer = this.writtenAnswer;
  }
}

export default TestPaperQuestionSimpleResponse;
