import { ApiProperty } from '@nestjs/swagger';
import TestPaperQuestion from '../../domain/TestPaperQuestion';
import TestPaperQuestionDetailResponse from './TestPaperQuestionDetailResponse';

class ReviewNoteQuestionResponse extends TestPaperQuestionDetailResponse {
  @ApiProperty()
  public review: string;

  constructor(testPaperQuestion: TestPaperQuestion) {
    super(testPaperQuestion);
    this.review = testPaperQuestion.review;
  }
}

export default ReviewNoteQuestionResponse;
