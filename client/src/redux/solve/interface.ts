import { SolveQuestion } from '../../types/question';
import { TestType } from '../../types/test';

interface Answer {
  testPaperQuestionId: number;
  writtenAnswer: string;
  questionType: string;
}

interface Mark {
  testPaperQuestionId: number;
  questionType: string;
  isCorrect: boolean;
}
export interface SolveState {
  id: number;
  title: string;
  type: string;
  minutes: number;
  seconds: number;
  state: TestType;
  createdAt: string;
  questions: SolveQuestion[];
  answerList: Answer[];
  markList: Mark[];
}

export interface InitSolve {
  id: number;
  title: string;
  type: string;
  minutes?: number;
  seconds?: number;
  state: TestType;
  createdAt?: string;
  questions: SolveQuestion[];
}

export interface UpdateAnswer {
  testPaperQuestionId: number;
  writtenAnswer: string;
}

export interface UpdateMark {
  testPaperQuestionId: number;
  isCorrect: boolean;
}

export interface UpdateGradeQuestion {
  state: TestType;
  questions: SolveQuestion[];
}
