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
export type TestType = 'SOLVING' | 'GRADING' | 'COMPLETE' | 'WORKBOOK';

export interface GetTestPaperResponse {
  testPaperId: number;
  title: string;
  minutes: number;
  seconds: number;
  createdAt: string;
  state: TestType;
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

interface MarkGradeTestPaperBody {
  testPaperQuestionId: number;
  questionType: string;
  isCorrect: boolean;
}

export interface PatchMarkGradeTestPaperProps {
  testPaperId: number;
  body: MarkGradeTestPaperBody[];
}
