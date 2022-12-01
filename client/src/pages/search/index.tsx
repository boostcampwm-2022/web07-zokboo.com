import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { RadioContainer, SearchResultContainer, SearchResultTitle, TitleContainer } from './Style';
import { CREATOR, WORKBOOK_NAME } from './constants';
import SearchResultItem from '../../components/search/SearchResultItem/SearchResultItem';
import SearchWorkbookType from '../../types/search';
import WORKBOOK_SEARCH from '../../react-query/keys/search';
import { getMockSearchData } from '../../api/search';

const Search = () => {
  const [searchMockData, setSearchMockData] = useState<SearchWorkbookType[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchOption, setSearchOption] = useState<string>(WORKBOOK_NAME);
  const searchWord = searchParams.get('q');

  const { isLoading, data, error } = useQuery([WORKBOOK_SEARCH, searchWord], getMockSearchData, {
    onSuccess: (d) => {
      console.log(d);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const handleSearchOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchOption(e.target.value);
  };

  return (
    <div>
      <SearchResultContainer>
        <TitleContainer>
          <SearchResultTitle>
            <b>{`"${searchWord}"`}</b> 에 대한 검색결과입니다.
          </SearchResultTitle>
          <RadioContainer>
            <label htmlFor={WORKBOOK_NAME}>
              <input
                type="radio"
                name="searchOption"
                value={WORKBOOK_NAME}
                onChange={handleSearchOption}
                defaultChecked
              />
              문제집 이름
            </label>

            <label htmlFor={CREATOR}>
              <input type="radio" name="searchOption" value={CREATOR} onChange={handleSearchOption} />
              생성자
            </label>
          </RadioContainer>
        </TitleContainer>
        {searchMockData.map((workbook, index) => (
          <SearchResultItem
            key={workbook.workbookId}
            workbookId={workbook.workbookId}
            title={workbook.title}
            description={workbook.description}
            questionCount={workbook.questionCount}
          />
        ))}
      </SearchResultContainer>
    </div>
  );
};

export default Search;
