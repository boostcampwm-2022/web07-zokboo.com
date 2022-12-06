interface SolveQuestion {
  questionId: number;
  question: string;
  questionType: string;
  commentary: string;
  answer: string;
  options: string[];
  workbookQuestionId?: number;
  writtenAnswer?: string;
}

export interface SolveState {
  id: number;
  title: string;
  type: string;
  questions: SolveQuestion[];
}
