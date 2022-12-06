export interface RawQuestion {
  question: string;
  questionType: string;
  difficulty: number;
}

export interface AddQuestion extends RawQuestion {
  questionId: number;
  hashtags: string[];
}
export interface PostCreateQuestionBody extends RawQuestion {
  answer: string;
  commentary: string;
  hashtags: string[];
  options: string[];
}

export interface GetQuestionResponse extends RawQuestion {
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

export interface SolveQuestion extends RawQuestion {
  questionId: number;
  commentary: string;
  answer: string;
  options: string[];
  workbookQuestionId?: number;
  writtenAnswer?: string;
}
