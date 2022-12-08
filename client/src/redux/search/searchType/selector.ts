import { RootState } from '../../store';
import { SearchTypeState } from './interface';

const selectSearchType = (state: RootState): SearchTypeState => state.login;

export default selectSearchType;
