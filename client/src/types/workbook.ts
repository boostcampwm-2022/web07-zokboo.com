import { GetQuestionResponse } from './question';

export interface PostCreateWorkBookBody {
  title: string;
  description: string;
  isPublic: boolean;
  questions: string[];
}

export interface GetWorkBookListResponse {
  workbookId: number;
  title: string;
  description: string;
  isPublic: boolean;
  questions: GetQuestionResponse[];
}
