import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import TestPaper from '../../domain/TestPaper';
import TestPaperQuestionDetailResponse from './TestPaperQuestionDetailResponse';
import TestPaperSimpleResponse from './TestPaperSimpleResponse';

class TestPaperGradedResponse extends TestPaperSimpleResponse {
  @ApiProperty({
    type: 'array',
    items: {
      $ref: getSchemaPath(TestPaperQuestionDetailResponse),
    },
  })
  public questions: TestPaperQuestionDetailResponse[];

  constructor(testPaper: TestPaper) {
    super(testPaper);
    this.questions = testPaper.questions.map((q) => new TestPaperQuestionDetailResponse(q));
  }
}

export default TestPaperGradedResponse;
