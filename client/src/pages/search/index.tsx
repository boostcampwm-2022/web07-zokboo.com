import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Items, SearchResultContainer, SearchResultTitle, TitleContainer } from './Style';
import SEARCH_TYPE from './constants';
import SearchWorkbookType from '../../types/search';
import WORKBOOK_SEARCH from '../../react-query/keys/search';
import { getMockSearchData } from '../../api/search';
import NewSearchResultItem from '../../components/search/NewSearchResultItem/NewSearchResultItem';
import SearchResultItem from '../../components/search/SearchResultItem';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import selectSearchType from '../../redux/search/searchType/selector';
import { updateSearchType } from '../../redux/search/searchType/slice';
import SelectSearchType from '../../components/search/SelectSearchType';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchWord = searchParams.get('q');
  const { searchType } = useAppSelector(selectSearchType, () => true);
  // 실제 search api 받아오려면 getMockSearchData => getSearchData로 변경하면 됨.

  const { isLoading, isSuccess, data } = useQuery<SearchWorkbookType[]>(
    [WORKBOOK_SEARCH, searchWord, searchType],
    getMockSearchData,
    {
      onError: (err) => {
        console.log(err);
      },
    },
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
