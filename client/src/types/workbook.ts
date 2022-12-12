import { GetQuestionResponse, WorkbookQuestion } from './question';

export interface Workbook {
  workbookId: number;
  title: string;
  description: string;
  questions: GetQuestionResponse[];
}

export interface PostCreateWorkbookBody {
  title: string;
  description: string;
  isPublic: boolean;
  questions: number[];
}

export interface GetWorkbookListResponse {
  workbookId: number;
  title: string;
  description: string;
  isPublic: boolean;
  questions: WorkbookQuestion[];
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
  workbookId: number;
  title: string;
  description: string;
  questions: GetQuestionResponse[];
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
