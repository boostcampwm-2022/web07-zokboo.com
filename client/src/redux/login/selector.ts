import { RootState } from '../store';
import { LoginState } from './interface';

const selectUserData = (state: RootState): LoginState => state.login;

export default selectUserData;
