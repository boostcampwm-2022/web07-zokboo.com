import { SolveQuestion } from '../../types/question';

export interface SolveState {
  id: number;
  title: string;
  type: string;
  minute: number;
  second: number;
  questions: SolveQuestion[];
}

export interface InitSolve {
  id: number;
  title: string;
  type: string;
  minute?: number;
  second?: number;
  questions: SolveQuestion[];
}
