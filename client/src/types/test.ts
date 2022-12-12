import { GetQuestionResponse } from './question';
import { WorkbookSearchData } from './workbook';

export interface PostCreateTestBody {
  title: string;
  minute: number;
  second: number;

  workbooks: {
    workbookId: number;
    count: number;
  }[];
}

export interface GetTestListResponse {
  testId: number;
  title: string;
  minute: number;
  second: number;

  questions: GetQuestionResponse[];
}

export interface TestListSearchData {
  testId: number;
  title: string;
  totalCount: number;
  minutes: number;
  seconds: number;

  workbooks: WorkbookSearchData[];
}
