import { ApiProperty } from '@nestjs/swagger';
import WorkbookQuestion from '../../domain/WorkbookQuestion';
import QuestionDetailResponse from '../../../question/dto/response/QuestionDetailResponse';

class WorkbookQuestionDetailResponse extends QuestionDetailResponse {
  @ApiProperty()
  public workbookQuestionId: number;

  @ApiProperty()
  public writtenAnswer: string;

  constructor(workbookQuestion: WorkbookQuestion) {
    super(workbookQuestion.question);
    this.workbookQuestionId = Number(workbookQuestion.workbookQuestionId);
    this.writtenAnswer = workbookQuestion.writtenAnswer;
  }
}

export default WorkbookQuestionDetailResponse;
