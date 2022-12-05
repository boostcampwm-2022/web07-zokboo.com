import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginState } from './interface';

// 초기값을 지정
const initialState: LoginState = {
  isLogined: false,
  avatar: '',
  nickname: '',
  userId: '',
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    signinSuccess: (state, action: PayloadAction<LoginState>) => {
      state.isLogined = true;
      state.avatar = action.payload.avatar;
      state.nickname = action.payload.nickname;
      state.userId = action.payload.userId;
    },
    signoutSuccess: (state) => {
      state = { ...initialState };
    },
  },
});

// reducers.signinSuccess => signinSuccess 할 수 있게끔 선언
export const { signinSuccess, signoutSuccess } = loginSlice.actions;

export default loginSlice;
