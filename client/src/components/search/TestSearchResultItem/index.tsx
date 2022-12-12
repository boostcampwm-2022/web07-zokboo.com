import { TestListSearchData } from '../../../types/test';
import SearchResultContainer from '../../common/searchResultContainer';

const TestSearchResultItem = ({ testId, title, totalCount, minutes, seconds, workbooks }: TestListSearchData) => {
  return (
    <SearchResultContainer>
      <div>{title}</div>
      <div>{totalCount}</div>
      <div>{minutes}</div>
      <div>{seconds}</div>
      <div>{JSON.stringify(workbooks)}</div>
    </SearchResultContainer>
  );
};

export default TestSearchResultItem;
