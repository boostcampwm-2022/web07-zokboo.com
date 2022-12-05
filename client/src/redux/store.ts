import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import storageSession from 'redux-persist/lib/storage/session';
import { persistReducer, persistStore } from 'redux-persist';
import { createLogger } from 'redux-logger';
import loginSlice from './login/slice';

const logger = createLogger();

const reducers = combineReducers({
  login: loginSlice.reducer,
});

export const store = configureStore({
  reducer: persistReducer({ key: 'root', storage: storageSession /** redux를 session storage처럼 활용 */ }, reducers),
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export const persistor = persistStore(store);

// type 지정
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
