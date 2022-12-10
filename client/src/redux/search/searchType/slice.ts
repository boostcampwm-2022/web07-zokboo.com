import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import SEARCH_TYPE from '../../../pages/search/constants';
import { SearchTypeState } from './interface';

const initialState: SearchTypeState = {
  searchType: SEARCH_TYPE.title,
};

const searchTypeSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    updateSearchType: (state, action: PayloadAction<SearchTypeState>) => {
      state.searchType = action.payload.searchType;
    },
  },
});

export const { updateSearchType } = searchTypeSlice.actions;

export default searchTypeSlice;
