import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import Workbook from '../../domain/Workbook';

class CreateWorkbookResponse {
  @ApiProperty()
  public workbookdId: number;

  @ApiProperty()
  public title: string;

  @ApiProperty()
  public description: string;

  @ApiProperty()
  public isPublic: boolean;

  @ApiProperty()
  public questionCount: number;

  constructor(workbook: Workbook) {
    if (!workbook.workbookId) {
      throw new BadRequestException('저장되지 않은 문제집입니다.');
    }
    if (workbook.questions === undefined) {
      throw new BadRequestException('문제 없는 문제집은 만들 수 없습니다.');
    }
    this.workbookdId = Number(workbook.workbookId);
    this.title = workbook.title;
    this.description = workbook.description;
    this.isPublic = workbook.isPublic;
    this.questionCount = workbook.questions.length;
  }
}

export default CreateWorkbookResponse;
