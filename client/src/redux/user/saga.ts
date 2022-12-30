import { PayloadAction } from '@reduxjs/toolkit';
import { all } from 'axios';
import { call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { getLocalLoginData } from '../../api/auth';
import { LoginAPIInputState } from './interface';
import { signin, signinFailure, signinSuccess, signout, signoutSuccess } from './slice';

function* signinSaga(action: PayloadAction<LoginAPIInputState>) {
  try {
    // call에 실행될 함수는 첫번째 인자로, 함수에 들어갈 파라미터는 두번째 인자부터 넣어주면 된다.
    // 먼저 signinAPI를 동기적으로 실행해준다. 만약 에러면 catch로가서 signinFailure가 될것이고
    // 성공하면 그대로 넘어가서 signinSuccess가 될 것이다.
    const { data } = yield call(getLocalLoginData, { email: action.payload.email, password: action.payload.password });
    // put은 dispatch와 역할이 같다!!!
    yield put(signinSuccess({ isLogined: true, ...data.data }));
  } catch (error) {
    console.error(error);
    yield put(signinFailure({ error }));
  }
}

function* signoutSaga() {
  // 좀 어색하긴 하지만 리팩토링은 일단 보류 ㅎㅎ..
  yield put(signoutSuccess);
}

function* watchSignin() {
  yield takeLatest(signin, signinSaga);
  yield takeLatest(signout, signoutSaga);
}

export default watchSignin;
