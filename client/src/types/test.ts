import { GetQuestionResponse } from './question';

export interface PostCreateTestBody {
  title: string;
  minutes: number;
  seconds: number;

  workbooks: {
    workbookId: number;
    count: number;
  }[];
}

export interface GetTestPaperResponse {
  testPaperId: number;
  title: string;
  minutes: number;
  seconds: number;
  createdAt: string;
  questions: GetQuestionResponse[];
}

export interface PutGradeTestPaperBody {
  testPaperQuestionId: number;
  questionId: number;
  QuestionType: string;
  writtenAnswer: string;
}
