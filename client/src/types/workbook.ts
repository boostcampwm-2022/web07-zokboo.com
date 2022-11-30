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
