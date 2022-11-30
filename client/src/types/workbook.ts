import { GetQuestionResponse } from './question';

export interface PostCreateWorkBookBody {
  title: string;
  description: string;
  isPublic: boolean;
  questions: number[];
}

interface WorkBookQuestions extends GetQuestionResponse {
  workbookQuestionId: number;
  writtenAnswer: string;
}

export interface GetWorkBookListResponse {
  workbookId: number;
  title: string;
  description: string;
  isPublic: boolean;
  questions: WorkBookQuestions[];
}

interface solveWorkbookQuestionParams {
  workbookId: number;
  workbookQuestionId: number;
}

interface solveWorkbookQuestionBody {
  newAnswer: string;
}

export interface PatchSolveWorkbookQuestionProps {
  params: solveWorkbookQuestionParams;
  body: solveWorkbookQuestionBody;
}
