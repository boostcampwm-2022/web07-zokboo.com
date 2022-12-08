import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitSolve, SolveState } from './interface';

// 초기값을 지정
const initialState: SolveState = {
  id: 0,
  title: '',
  type: '',
  minute: 0,
  second: 0,
  questions: [],
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
      state.minute = action.payload.minute ?? 0;
      state.second = action.payload.second ?? 0;
    },
  },
});

export const { initSolve } = solveSlice.actions;

export default solveSlice;
