import { GetQuestionResponse, WorkbookQuestion } from './question';

export interface Workbook {
  workbookId: number;
  title: string;
  description: string;
  questions: GetQuestionResponse[];
  questionCount: number;
}

export interface PostCreateWorkbookBody {
  title: string;
  description: string;
  isPublic: boolean;
  questions: number[];
}

export interface WorkbookList {
  workbookId: number;
  title: string;
  description: string;
  isPublic: boolean;
  questions: WorkbookQuestion[];
}

export interface GetWorkbookListResponse {
  msg: string;
  data: {
    workbookId: number;
    title: string;
    description: string;
    isPublic: boolean;
    questions: WorkbookQuestion[];
  };
}

interface SolveWorkbookQuestionParams {
  workbookId: number;
  workbookQuestionId: number;
}

export interface SolveWorkbookQuestionBody {
  newAnswer: string;
}

export interface PatchSolveWorkbookQuestionProps {
  params: SolveWorkbookQuestionParams;
  body: SolveWorkbookQuestionBody;
}

export interface GetWorkbookListByTitleResponse {
  msg: string;
  data: {
    workbookId: number;
    title: string;
    description: string;
    questions: GetQuestionResponse[];
    questionCount: number;
  }[];
}

export interface PostWorkbookSave {
  workbookId: number;
}

export interface WorkbookSearchData {
  workbookId: number;
  title: string;
  description: string;
  questionCount: number;
}
