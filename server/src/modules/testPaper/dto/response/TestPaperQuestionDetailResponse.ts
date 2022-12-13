import { ApiProperty } from '@nestjs/swagger';
import TestPaperQuestion from '../../domain/TestPaperQuestion';
import TestPaperQuestionState from '../../enum/TestPaperQuestionState';
import TestPaperQuestionSimpleResponse from './TestPaperQuestionSimpleResponse';

class TestPaperQuestionDetailResponse extends TestPaperQuestionSimpleResponse {
  @ApiProperty({
    enum: TestPaperQuestionState,
    enumName: 'Test Paper Question State',
  })
  public state: TestPaperQuestionState;

  constructor(testPaperQuestion: TestPaperQuestion) {
    super(testPaperQuestion);
    this.state = testPaperQuestion.state;
  }
}

export default TestPaperQuestionDetailResponse;
