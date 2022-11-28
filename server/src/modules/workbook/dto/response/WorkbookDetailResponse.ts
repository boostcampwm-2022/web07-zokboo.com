import Workbook from '../../domain/Workbook';
import QuestionDetailResponse from './QuestionDetailResponse';

class WorkbookDetailResponse {
  public workbookId: number;
  public title: string;
  public description: string;
  public isPublic: boolean;
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
