import { ApiProperty } from '@nestjs/swagger';
import WorkbookQuestion from '../../domain/WorkbookQuestion';
import QuestionSimpleResponse from '../../../question/dto/response/QuestionSimpleResponse';

class WorkbookQuestionSimpleResponse extends QuestionSimpleResponse {
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

export default WorkbookQuestionSimpleResponse;
