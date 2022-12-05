import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
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
      // eslint-disable-next-line no-param-reassign
      state.isLogined = true;
      // eslint-disable-next-line no-param-reassign
      state.avatar = action.payload.avatar;
      // eslint-disable-next-line no-param-reassign
      state.nickname = action.payload.nickname;
      // eslint-disable-next-line no-param-reassign
      state.userId = action.payload.userId;
    },
    signoutSuccess: (state) => {
      // eslint-disable-next-line no-param-reassign
      state = { ...initialState };
    },
  },
});
export const selectUserData = (state: RootState): LoginState => state.login;
// reducers.signinSuccess => signinSuccess 할 수 있게끔 선언
export const { signinSuccess, signoutSuccess } = loginSlice.actions;

export default loginSlice;
