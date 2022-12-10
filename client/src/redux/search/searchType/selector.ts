import { RootState } from '../../store';
import { SearchTypeState } from './interface';

const selectSearchType = (state: RootState): SearchTypeState => state.searchType;

export default selectSearchType;
