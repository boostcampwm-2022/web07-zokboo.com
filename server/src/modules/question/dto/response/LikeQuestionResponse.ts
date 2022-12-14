import { ApiProperty } from '@nestjs/swagger';
import QuestionLike from '../../domain/QuestionLike';

export default class LikeQuestionResponse {
  @ApiProperty()
  public questionId: number;

  @ApiProperty()
  public userId: number;

  constructor(record: QuestionLike) {
    this.questionId = Number(record.questionId);
    this.userId = Number(record.userId);
  }
}
