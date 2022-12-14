import { ApiProperty } from '@nestjs/swagger';
import TestPaperQuestion from '../../domain/TestPaperQuestion';

export default class ReviewQuestionResponse {
  @ApiProperty()
  public testPaperQuestionId: number;

  constructor(testPaperQuestion: TestPaperQuestion) {
    this.testPaperQuestionId = Number(testPaperQuestion.testPaperQuestionId);
  }
}
