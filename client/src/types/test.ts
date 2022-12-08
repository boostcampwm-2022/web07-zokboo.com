import { GetQuestionResponse } from './question';

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
