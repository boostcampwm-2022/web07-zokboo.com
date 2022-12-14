import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { Items, SearchResultContainer, SearchResultTitle, TitleContainer } from './Style';
import SearchWorkbookType from '../../types/search';
import WORKBOOK_SEARCH from '../../react-query/keys/search';
import SearchResultItem from '../../components/search/SearchResultItem';
import { useAppSelector } from '../../redux/hooks';
import selectSearchType from '../../redux/search/searchType/selector';
import SelectSearchType from '../../components/search/SelectSearchType';
import getSearchData from '../../api/search';
import Loading from '../../components/common/utils/Loading';
import Error from '../../components/common/utils/Error';

const Search = () => {
  const [searchParams] = useSearchParams();
  const searchWord = searchParams.get('q');
  const { searchType } = useAppSelector(selectSearchType);
  const [searchResult, setSearchResult] = useState<SearchWorkbookType[]>([]);

  const { isLoading, isSuccess, data } = useQuery([WORKBOOK_SEARCH, searchWord, searchType], getSearchData, {
    onSuccess: (d) => {
      setSearchResult(d.data);
    },
  });

  return (
    <SearchResultContainer>
      <TitleContainer>
        <SearchResultTitle>
          <b>{`"${searchWord}"`}</b> 에 대한 검색결과입니다.
        </SearchResultTitle>
        <SelectSearchType />
      </TitleContainer>
      <Items>
        {isLoading && <Loading />}
        {isSuccess &&
          (searchResult.length !== 0 ? (
            searchResult.map((workbook, index) => (
              <SearchResultItem
                key={workbook.workbookId}
                workbookId={workbook.workbookId}
                title={workbook.title}
                description={workbook.description}
                questionCount={workbook.questionCount}
              />
            ))
          ) : (
            <Error message="검색결과가 없습니다." />
          ))}
      </Items>
    </SearchResultContainer>
  );
};

export default Search;
