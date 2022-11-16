import styled from 'styled-components';
import { IoMdArrowDropdown } from 'react-icons/io';
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

const Search = () => {
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
        <SearchResultItem />
        <SearchResultItem />
        <SearchResultItem />
        <SearchResultItem />
        <SearchResultItem />
        <SearchResultItem />
        <SearchResultItem />
        {/** temp */}
      </SearchResultContainer>
    </div>
  );
};

export default Search;
