import { ApiProperty } from '@nestjs/swagger';
import Workbook from '../../domain/Workbook';

class WorkbookSimpleResponse {
  @ApiProperty()
  public workbookId: number;

  @ApiProperty()
  public title: string;

  @ApiProperty()
  public description: string;

  @ApiProperty()
  public questionCount: number;

  constructor(workbook: Workbook) {
    this.workbookId = Number(workbook.workbookId);
    this.title = workbook.title;
    this.description = workbook.description;
    this.questionCount = workbook.questions.length;
  }
}

export default WorkbookSimpleResponse;
