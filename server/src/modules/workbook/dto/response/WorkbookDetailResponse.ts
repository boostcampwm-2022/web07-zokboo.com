import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import Workbook from '../../domain/Workbook';
import QuestionDetailResponse from './QuestionDetailResponse';

class WorkbookDetailResponse {
  @ApiProperty()
  public workbookId: number;

  @ApiProperty()
  public title: string;

  @ApiProperty()
  public description: string;

  @ApiProperty()
  public isPublic: boolean;

  @ApiProperty({
    type: 'array',
    items: {
      $ref: getSchemaPath(QuestionDetailResponse),
    },
  })
  public questions: QuestionDetailResponse[];

  constructor(workbook: Workbook) {
    this.workbookId = Number(workbook.workbookId);
    this.title = workbook.title;
    this.description = workbook.description;
    this.isPublic = workbook.isPublic;
    this.questions = workbook.questions.map((wq) => new QuestionDetailResponse(wq.question));
  }
}

export default WorkbookDetailResponse;
