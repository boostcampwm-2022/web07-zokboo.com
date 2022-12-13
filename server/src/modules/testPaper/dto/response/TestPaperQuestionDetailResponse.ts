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

  @ApiProperty()
  public answer: string;

  @ApiProperty()
  public commentary: string;

  constructor(testPaperQuestion: TestPaperQuestion) {
    super(testPaperQuestion);
    this.state = testPaperQuestion.state;
    this.answer = testPaperQuestion.question.answer;
    this.commentary = testPaperQuestion.question.commentary;
  }
}

export default TestPaperQuestionDetailResponse;
