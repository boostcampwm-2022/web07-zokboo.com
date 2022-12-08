import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import TestSimpleResponse from 'src/modules/test/dto/response/TestSimpleResponse';
import TestPaper from '../../domain/TestPaper';
import TestPaperQuestionSimpleResponse from './TestPaperQuestionSimpleResponse';

class TestPaperDetailResponse {
  @ApiProperty()
  public testPaperId: number;

  @ApiProperty()
  public isCompleted: boolean;

  @ApiProperty()
  public correctCount: number;

  @ApiProperty()
  public title: string;

  @ApiProperty()
  public minutes: number;

  @ApiProperty()
  public seconds: number;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public updatedAt: Date;

  @ApiProperty({})
  public test: TestSimpleResponse;

  @ApiProperty({
    type: 'array',
    items: {
      $ref: getSchemaPath(TestPaperQuestionSimpleResponse),
    },
  })
  public questions: TestPaperQuestionSimpleResponse[];

  constructor(testPaper: TestPaper) {
    this.testPaperId = Number(testPaper.testPaperId);
    this.isCompleted = testPaper.isCompleted;
    this.correctCount = testPaper.correctCount;
    this.minutes = Math.floor(testPaper.timeout / 60);
    this.seconds = testPaper.timeout % 60;
    this.title = testPaper.title;
    this.createdAt = testPaper.createdAt;
    this.updatedAt = testPaper.updatedAt;
    this.test = new TestSimpleResponse(testPaper.test);
    this.questions = testPaper.questions.map((q) => new TestPaperQuestionSimpleResponse(q));
  }
}

export default TestPaperDetailResponse;
