import { RootState } from '../store';
import { UserState } from './interface';

const selectUserData = (state: RootState): UserState => state.user;

export default selectUserData;
