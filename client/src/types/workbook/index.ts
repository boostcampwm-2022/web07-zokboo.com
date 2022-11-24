export interface Problem {
  id: string;
  question: string;
  hashtags: string[];
}
export interface PostCreateQuestionBody extends Problem {
  questionType: string;
  answer: string;
  commentary: string;
  difficulty: number;
}
