export interface Problem {
  questionId: string;
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
