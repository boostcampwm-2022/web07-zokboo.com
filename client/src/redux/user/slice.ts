import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginAPIInputState, LoginAPIReturnState, UpdateUser, UserState } from './interface';
import DefaultAvatar from '../../images/default-avatar.jpg';

// 초기값을 지정
const initialState: UserState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null,
  //
  isLogined: false,
  avatar: '',
  nickname: '',
  userId: '',
};

// reducer와 action을 동시 생성. action은 후에 따로 export.
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // action에 노란줄 뜨긴 하지만 이 input은 받아놔야함. 왜냐하면 saga에서 API 통신할 때 쓰이기 때문
    signin: (state, action: PayloadAction<LoginAPIInputState>) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.error = null;
    },
    signinSuccess: (state, action: PayloadAction<LoginAPIReturnState>) => {
      state.isLoading = false;
      state.isSuccess = true;

      state.isLogined = true;
      state.avatar = action.payload.avatar ? action.payload.avatar : DefaultAvatar;
      state.nickname = action.payload.nickname;
      state.userId = action.payload.userId;
    },
    signinFailure: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload.error;
    },
    signout: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.error = null;
    },
    signoutSuccess: (state) => {
      state.isLogined = initialState.isLogined;
      state.avatar = initialState.avatar;
      state.nickname = initialState.nickname;
      state.userId = initialState.userId;
    },

    // 사실상 필요없음. api통신통해 에러발생하는 상황이 일어나지 않기 때문에
    signoutFailure: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload.error;
    },
    updateUser: (state, action: PayloadAction<UpdateUser>) => {
      state.avatar = action.payload.avatar;
    },
  },
});

// actions export
// reducers.signinSuccess => signinSuccess 할 수 있게끔 선언
export const { signin, signinSuccess, signinFailure, signout, signoutSuccess, signoutFailure, updateUser } =
  userSlice.actions;

export default userSlice;
