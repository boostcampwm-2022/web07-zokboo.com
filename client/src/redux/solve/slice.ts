import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SolveState } from './interface';

// 초기값을 지정
const initialState: SolveState = {
  id: 0,
  title: '',
  type: '',
  questions: [],
};

const solveSlice = createSlice({
  name: 'solve',
  initialState,
  reducers: {
    initSolve: (state, action: PayloadAction<SolveState>) => {
      state.id = action.payload.id;
      state.title = action.payload.title;
      state.type = action.payload.type;
      state.questions = action.payload.questions;
    },
  },
});

export const { initSolve } = solveSlice.actions;

export default solveSlice;
