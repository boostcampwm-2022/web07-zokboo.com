import { SolveQuestion } from '../../types/question';

export interface SolveState {
  id: number;
  title: string;
  type: string;
  questions: SolveQuestion[];
}
