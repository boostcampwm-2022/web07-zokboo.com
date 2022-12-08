import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Items, RadioContainer, SearchResultContainer, SearchResultTitle, TitleContainer } from './Style';
import SEARCH_TYPE from './constants';
import SearchWorkbookType from '../../types/search';
import WORKBOOK_SEARCH from '../../react-query/keys/search';
import { getMockSearchData } from '../../api/search';
import NewSearchResultItem from '../../components/search/NewSearchResultItem/NewSearchResultItem';
import SearchResultItem from '../../components/search/SearchResultItem/SearchResultItem';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import selectSearchType from '../../redux/search/searchType/selector';
import { updateSearchType } from '../../redux/search/searchType/slice';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchWord = searchParams.get('q');
  const dispatch = useAppDispatch();
  const { searchType } = useAppSelector(selectSearchType);
  const [searchOption, setSearchOption] = useState<string>(searchType);

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

  const handleSearchOption = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchOption(e.target.value);
    dispatch(updateSearchType({ searchType: e.target.value }));
  }, []);

  return (
    <div>
      <SearchResultContainer>
        <TitleContainer>
          <SearchResultTitle>
            <b>{`"${searchWord}"`}</b> 에 대한 검색결과입니다.
          </SearchResultTitle>
          <RadioContainer>
            <label htmlFor={SEARCH_TYPE.title}>
              <input
                type="radio"
                name="searchOption"
                value={SEARCH_TYPE.title}
                onChange={handleSearchOption}
                defaultChecked={searchOption === SEARCH_TYPE.title}
              />
              제목
            </label>

            <label htmlFor={SEARCH_TYPE.content}>
              <input
                type="radio"
                name="searchOption"
                value={SEARCH_TYPE.content}
                onChange={handleSearchOption}
                defaultChecked={searchOption === SEARCH_TYPE.content}
              />
              내용
            </label>

            <label htmlFor={SEARCH_TYPE.title_content}>
              <input
                type="radio"
                name="searchOption"
                value={SEARCH_TYPE.title_content}
                onChange={handleSearchOption}
                defaultChecked={searchOption === SEARCH_TYPE.title_content}
              />
              제목+내용
            </label>
          </RadioContainer>
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
