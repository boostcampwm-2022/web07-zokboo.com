import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginState, UpdateUser } from './interface';
import DefaultAvatar from '../../images/default-avatar.jpg';

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
      state.avatar = action.payload.avatar ? action.payload.avatar : DefaultAvatar;
      state.nickname = action.payload.nickname;
      state.userId = action.payload.userId;
    },
    signoutSuccess: (state) => {
      state.isLogined = initialState.isLogined;
      state.avatar = initialState.avatar;
      state.nickname = initialState.nickname;
      state.userId = initialState.userId;
    },
    updateUser: (state, action: PayloadAction<UpdateUser>) => {
      state.avatar = action.payload.avatar;
    },
  },
});

// reducers.signinSuccess => signinSuccess 할 수 있게끔 선언
export const { signinSuccess, signoutSuccess, updateUser } = loginSlice.actions;

export default loginSlice;
