import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import TestPaper from '../../domain/TestPaper';
import TestPaperQuestionSimpleResponse from './TestPaperQuestionSimpleResponse';
import TestPaperSimpleResponse from './TestPaperSimpleResponse';

class TestPaperDetailResponse extends TestPaperSimpleResponse {
  @ApiProperty({
    type: 'array',
    items: {
      $ref: getSchemaPath(TestPaperQuestionSimpleResponse),
    },
  })
  public questions: TestPaperQuestionSimpleResponse[];

  constructor(testPaper: TestPaper) {
    super(testPaper);
    this.questions = testPaper.questions.map((q) => new TestPaperQuestionSimpleResponse(q));
  }
}

export default TestPaperDetailResponse;
