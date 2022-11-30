export interface Question {
  questionId: number;
  question: string;
  questionType: string;
  difficulty: number;
  hashtags: string[];
}
export interface PostCreateQuestionBody {
  question: string;
  questionType: string;
  answer: string;
  commentary: string;
  difficulty: number;
  hashtags: string[];
  options: string[];
}

export interface GetQuestionResponse {
  questionId: number;
  question: string;
  questionType: string;
  difficulty: number;
  commentary: string;
  answer: string;
  hashtags: string[];
  createdAt: Date;
  updatedAt: Date;
  options: string[];
}
