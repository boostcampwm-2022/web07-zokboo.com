import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import TestPaper from '../../domain/TestPaper';
import ReviewNoteQuestionResponse from './ReviewNoteQuestionResponse';
import TestPaperSimpleResponse from './TestPaperSimpleResponse';

class ReviewNoteResponse extends TestPaperSimpleResponse {
  @ApiProperty({
    type: 'array',
    items: {
      $ref: getSchemaPath(ReviewNoteQuestionResponse),
    },
  })
  public questions: ReviewNoteQuestionResponse[];

  constructor(testPaper: TestPaper) {
    super(testPaper);
    this.questions = testPaper.questions.map((q) => new ReviewNoteQuestionResponse(q));
  }
}

export default ReviewNoteResponse;
