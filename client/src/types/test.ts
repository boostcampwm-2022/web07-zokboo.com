import { GetTestQuestionResponse } from './question';

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
  state: string;
  questions: GetTestQuestionResponse[];
}

interface GradeTestPaperBody {
  testPaperQuestionId: number;
  questionType: string;
  writtenAnswer: string;
}

export interface PutGradeTestPaperProps {
  testPaperId: number;
  body: GradeTestPaperBody[];
}
