import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitSolve, SolveState } from './interface';

// 초기값을 지정
const initialState: SolveState = {
  id: 0,
  title: '',
  type: '',
  minutes: 0,
  seconds: 0,
  questions: [],
  createdAt: '',
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
      state.createdAt = action.payload.createdAt ?? '';
    },
  },
});

export const { initSolve } = solveSlice.actions;

export default solveSlice;
