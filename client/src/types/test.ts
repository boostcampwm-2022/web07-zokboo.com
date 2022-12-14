import { GetTestQuestionResponse } from './question';
import { WorkbookSearchData } from './workbook';

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
  msg: string;
  data: {
    testPaperId: number;
    title: string;
    minutes: number;
    seconds: number;
    createdAt: string;
    state: TestType;
    questions: GetTestQuestionResponse[];
  };
}

interface GradeTestPaperBody {
  questions: {
    testPaperQuestionId: number;
    writtenAnswer: string;
  }[];
}

export interface PutGradeTestPaperProps {
  testPaperId: number;
  body: GradeTestPaperBody;
}

export interface GetGradeTestPaperResponse {
  msg: string;
  data: {
    testPaperId: number;
    title: string;
    minutes: number;
    seconds: number;
    createdAt: string;
    state: TestType;
    questions: GetTestQuestionResponse[];
  };
}

interface MarkGradeTestPaperBody {
  questions: {
    testPaperQuestionId: number;
    isCorrect: boolean;
  }[];
}

export interface PatchMarkGradeTestPaperProps {
  testPaperId: number;
  body: MarkGradeTestPaperBody;
}

export interface TestListSearchData {
  testId: number;
  title: string;
  totalCount: number;
  minutes: number;
  seconds: number;

  workbooks: {
    workbook: WorkbookSearchData;
    count: number;
  }[];
}
