import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { RadioContainer, SearchResultContainer, SearchResultTitle, TitleContainer } from './Style';
import { CREATOR, WORKBOOK_NAME } from './constants';
import SearchResultItem from '../../components/search/SearchResultItem/SearchResultItem';
import SearchWorkbookType from '../../types/search';

const Search = () => {
  const [searchMockData, setSearchMockData] = useState<SearchWorkbookType[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchOption, setSearchOption] = useState<string>(WORKBOOK_NAME);
  const searchWord = searchParams.get('q');

  const handleSearchOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchOption(e.target.value);
  };

  useEffect(() => {
    axios
      .get('search')
      .then((res) => res.data)
      .then((data) => setSearchMockData(data));
  });

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
            key={workbook.workbook_id}
            id={workbook.workbook_id}
            title={workbook.title}
            creatorId={workbook.creator_id}
            createAt={workbook.create_at}
            description={workbook.description}
          />
        ))}
      </SearchResultContainer>
    </div>
  );
};

export default Search;
