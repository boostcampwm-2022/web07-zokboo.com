import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Items, SearchResultContainer, SearchResultTitle, TitleContainer } from './Style';
import SearchWorkbookType from '../../types/search';
import WORKBOOK_SEARCH from '../../react-query/keys/search';
import SearchResultItem from '../../components/search/SearchResultItem';
import { useAppSelector } from '../../redux/hooks';
import selectSearchType from '../../redux/search/searchType/selector';
import SelectSearchType from '../../components/search/SelectSearchType';
import getSearchData from '../../api/search';

const Search = () => {
  const [searchParams, _] = useSearchParams();
  const searchWord = searchParams.get('q');
  const { searchType } = useAppSelector(selectSearchType, () => true);

  const { isLoading, isSuccess, data } = useQuery<SearchWorkbookType[]>(
    [WORKBOOK_SEARCH, searchWord, searchType],
    getSearchData,
  );

  return (
    <div>
      <SearchResultContainer>
        <TitleContainer>
          <SearchResultTitle>
            <b>{`"${searchWord}"`}</b> 에 대한 검색결과입니다.
          </SearchResultTitle>
          <SelectSearchType />
        </TitleContainer>
        <Items>
          {isLoading && '로딩중'}
          {isSuccess &&
            (data
              ? data.map((workbook, index) => (
                  <SearchResultItem
                    key={workbook.workbookId}
                    workbookId={workbook.workbookId}
                    title={workbook.title}
                    description={workbook.description}
                    questionCount={workbook.questionCount}
                  />
                ))
              : `검색결과가 없습니다.`)}
        </Items>
      </SearchResultContainer>
    </div>
  );
};

export default Search;
