import { SolveQuestion } from '../../types/question';

interface Answer {
  testPaperQuestionId: number;
  writtenAnswer: string;
  questionType: string;
}
export interface SolveState {
  id: number;
  title: string;
  type: string;
  minutes: number;
  seconds: number;
  state: string;
  createdAt: string;
  questions: SolveQuestion[];
  answerList: Answer[];
}

export interface InitSolve {
  id: number;
  title: string;
  type: string;
  minutes?: number;
  seconds?: number;
  state: string;
  createdAt?: string;
  questions: SolveQuestion[];
}

export interface UpdateAnswer {
  testPaperQuestionId: number;
  writtenAnswer: string;
}
