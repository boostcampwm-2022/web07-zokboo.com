import { SolveQuestion } from '../../types/question';

interface Answer {
  questionId: number;
  writtenAnswer: string;
  questionType: string;
}
export interface SolveState {
  id: number;
  title: string;
  type: string;
  minutes: number;
  seconds: number;
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
  createdAt?: string;
  questions: SolveQuestion[];
}

export type InitAnswer = Answer[];

export interface UpdateAnswer {
  questionId: number;
  writtenAnswer: string;
}
