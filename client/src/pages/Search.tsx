import styled, { css } from 'styled-components';

import { IoMdArrowDropdown } from 'react-icons/io';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/header/Header';
import { colors, device, paddings } from '../styles/theme';
import SearchResultItem from '../components/search/SearchResultItem';

const SearchResultContainer = styled.div`
  width: 80%;
  //max-width: 800px;

  box-sizing: border-box;
  margin: 80px auto 0px;
  padding: ${paddings.responsive};

  @media screen and (max-width: ${device.tablet}) {
    width: 100%;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SortContainer = styled.div`
  border: 1px solid ${colors.gray3};
  border-radius: 8px;
  padding: 4px 6px;

  color: ${colors.gray4};
  font-size: 14px;

  display: flex;
  align-items: center;
`;

const SearchResultTitle = styled.div``;

interface SearchData {
  workbook_id: number;
  title: string;
  creator_id: string;
  create_at: string;
  description: string;
}
const Search = () => {
  const [searchData, setSearchData] = useState<SearchData[]>([]);

  useEffect(() => {
    axios.get('/search').then((res) => setSearchData(res.data));
  }, []);

  return (
    <div>
      <Header />
      <SearchResultContainer>
        <TitleContainer>
          <SearchResultTitle>검색결과</SearchResultTitle>
          <SortContainer>
            정렬
            <IoMdArrowDropdown />
          </SortContainer>
        </TitleContainer>
        {/** temp */}
        {searchData.map((x, i) => (
          <SearchResultItem
            key={x.workbook_id}
            title={x.title}
            creatorId={x.creator_id}
            createAt={x.create_at}
            description={x.description}
          />
        ))}
        {/** temp */}
      </SearchResultContainer>
    </div>
  );
};

export default Search;
