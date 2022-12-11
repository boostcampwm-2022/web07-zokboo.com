export interface AddQuestion {
  question: string;
  questionType: string;
  difficulty: number;
  questionId: number;
  hashtags: string[];
}
export type PostCreateQuestionBody = globalThis.FormData;

export interface GetQuestionResponse {
  question: string;
  questionType: string;
  difficulty: number;
  questionId: number;
  commentary: string;
  answer: string;
  hashtags: string[];
  createdAt: Date;
  updatedAt: Date;
  options: string[];
}

export interface WorkbookQuestion extends GetQuestionResponse {
  workbookQuestionId: number;
  writtenAnswer: string;
}

export interface SolveQuestion {
  question: string;
  questionType: string;
  difficulty: number;
  questionId: number;
  commentary: string;
  answer: string;
  options: string[];
  workbookQuestionId?: number;
  writtenAnswer?: string;
}
