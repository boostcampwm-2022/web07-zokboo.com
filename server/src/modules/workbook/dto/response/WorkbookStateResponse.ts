import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import Workbook from '../../domain/Workbook';
import WorkbookQuestionDetailResponse from './WorkbookQuestionDetailResponse';

class WorkbookStateResponse {
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
      $ref: getSchemaPath(WorkbookQuestionDetailResponse),
    },
  })
  public questions: WorkbookQuestionDetailResponse[];

  constructor(workbook: Workbook) {
    this.workbookId = Number(workbook.workbookId);
    this.title = workbook.title;
    this.description = workbook.description;
    this.isPublic = workbook.isPublic;
    this.questions = workbook.questions.map((wq) => new WorkbookQuestionDetailResponse(wq));
  }
}

export default WorkbookStateResponse;
