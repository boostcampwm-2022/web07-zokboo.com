import { BadRequestException } from '@nestjs/common';
import Workbook from '../../domain/Workbook';

class CreateWorkbookResponse {
  public workbookdId: number;
  public title: string;
  public description: string;
  public isPublic: boolean;
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
