import { SolveQuestion } from '../../types/question';

export interface SolveState {
  id: number;
  title: string;
  type: string;
  minutes: number;
  seconds: number;
  createdAt: string;
  questions: SolveQuestion[];
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
