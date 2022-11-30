import { GetQuestionResponse } from './question';

export interface PostCreateWorkbookBody {
  title: string;
  description: string;
  isPublic: boolean;
  questions: number[];
}

interface WorkbookQuestions extends GetQuestionResponse {
  workbookQuestionId: number;
  writtenAnswer: string;
}

export interface GetWorkbookListResponse {
  workbookId: number;
  title: string;
  description: string;
  isPublic: boolean;
  questions: WorkbookQuestions[];
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
