import { all, call, fork } from 'redux-saga/effects';
import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import storageSession from 'redux-persist/lib/storage/session';
import { persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import userSlice from './user/slice';
import solveSlice from './solve/slice';
import searchTypeSlice from './search/searchType/slice';
import userSaga from './user/saga';
import watchSignin from './user/saga';

// saga를 한번에 모아서 store에 연결
function* sagas() {
  console.log(1);
  yield all([fork(userSaga)]);
}

const reducers = combineReducers({
  user: userSlice.reducer,
  solve: solveSlice.reducer,
  searchType: searchTypeSlice.reducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: persistReducer({ key: 'root', storage: storageSession /** redux를 session storage처럼 활용 */ }, reducers),
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [sagaMiddleware, ...getDefaultMiddleware({ serializableCheck: false })], // 기본데이터타입을 string으로 바꿔줌. (local storage를 사용하기 위함)
});
sagaMiddleware.run(sagas);

export const persistor = persistStore(store);

// type 지정
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
