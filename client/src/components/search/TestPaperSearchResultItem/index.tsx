import SearchResultContainer from '../../common/searchResultContainer';

const TestPaperSearchResultItem = ({ msg }: { msg: string }) => {
  return (
    <SearchResultContainer>
      <div>{msg}</div>
    </SearchResultContainer>
  );
};

export default TestPaperSearchResultItem;
