import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitSolve, UpdateAnswer, SolveState, UpdateGradeQuestion, UpdateMark } from './interface';

// 초기값을 지정
const initialState: SolveState = {
  id: 0,
  title: '',
  type: '',
  minutes: 0,
  seconds: 0,
  state: 'WORKBOOK',
  questions: [],
  createdAt: '',
  answerList: [],
  markList: [],
};

const solveSlice = createSlice({
  name: 'solve',
  initialState,
  reducers: {
    initSolve: (state, action: PayloadAction<InitSolve>) => {
      state.id = action.payload.id;
      state.title = action.payload.title;
      state.type = action.payload.type;
      state.questions = action.payload.questions;
      state.minutes = action.payload.minutes ?? 0;
      state.seconds = action.payload.seconds ?? 0;
      state.state = action.payload.state;
      state.createdAt = action.payload.createdAt ?? '';
      state.answerList = action.payload.questions.map(({ questionId, writtenAnswer }) => ({
        testPaperQuestionId: questionId,
        writtenAnswer: writtenAnswer ?? '',
      }));
      state.markList = action.payload.questions.map(({ questionId, questionType }) => ({
        testPaperQuestionId: questionId,
        questionType,
        isCorrect: true,
      }));
    },
    updateAnswer: (state, action: PayloadAction<UpdateAnswer>) => {
      state.answerList = state.answerList.map((data) => {
        const { testPaperQuestionId } = data;
        return testPaperQuestionId === action.payload.testPaperQuestionId
          ? { ...data, writtenAnswer: action.payload.writtenAnswer }
          : data;
      });
    },
    updateMark: (state, action: PayloadAction<UpdateMark>) => {
      state.markList = state.markList.map((data) => {
        const { testPaperQuestionId } = data;
        return testPaperQuestionId === action.payload.testPaperQuestionId
          ? { ...data, isCorrect: action.payload.isCorrect }
          : data;
      });
    },
    updateGradeQuestion: (state, action: PayloadAction<UpdateGradeQuestion>) => {
      state.state = action.payload.state;
      state.questions = action.payload.questions;
    },
  },
});

export const { initSolve, updateAnswer, updateMark, updateGradeQuestion } = solveSlice.actions;

export default solveSlice;
