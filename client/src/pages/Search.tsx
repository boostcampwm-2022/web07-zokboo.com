import styled, { css } from 'styled-components';
import { FiMoreHorizontal } from 'react-icons/fi';
import { AiOutlineHeart, AiFillHeart, AiFillFile, AiOutlineFile } from 'react-icons/ai';
import { useState } from 'react';
import Header from '../components/header/Header';
import { colors, device, paddings } from '../styles/theme';

const SearchResultContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 80%;

  box-sizing: border-box;
  margin: 80px auto 0px;
  padding: ${paddings.responsive};

  @media screen and (max-width: ${device.tablet}) {
    width: 100%;
  }
`;

const SearchResultTitle = styled.div`
  padding: 16px 0px;
`;

const SearchResultItem = styled.div`
  border: 1px solid ${colors.gray3};
  border-radius: 4px;
  box-shadow: 2px 2px ${colors.gray1};
  padding: 12px;
  margin: 8px 0px;

  .more-button {
    float: right;
  }

  @media screen and (max-width: ${device.mobileWidth}) {
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid ${colors.gray3};
    box-shadow: none;
  }
`;

const ItemTitle = styled.div``;
const ItemExplain = styled.div`
  font-size: 8px;
  color: ${colors.gray4};
`;
const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: ${colors.gray4};
  > * {
    padding: 4px;
  }

  .fillStyled {
    color: ${colors.primary};
  }
`;

const Heart = styled.div``;
const Scrap = styled.div``;

const ContentButtons = styled.div`
  float: right;
  > * {
    margin: 0px 0px 0px 24px;
    padding: 4px;

    background: none;
    border: 1px solid ${colors.primary};
    border-radius: 4px;
    color: ${colors.primary};

    :hover {
      opacity: 0.7;
    }
  }
`;
const TestButton = styled.input``;
const SaveButton = styled.input``;

const Search = () => {
  const [isLike, setIsLike] = useState<boolean>(false);
  const [isScrap, setIsScrap] = useState<boolean>(false);

  return (
    <div>
      <Header />
      <SearchResultContainer>
        <SearchResultTitle>검색결과</SearchResultTitle>
        <SearchResultItem>
          <FiMoreHorizontal className="more-button" />
          <ItemTitle>CS 면접 대비 문제집</ItemTitle>
          <ItemExplain>이 문제집은 CS면접을 대비하기 위해 작성한 문제를 모아둔 문제집입니다.</ItemExplain>
          <ItemInfo>
            <Heart onClick={() => setIsLike((prev) => !prev)}>
              {isLike ? <AiFillHeart className="fillStyled" /> : <AiOutlineHeart />} 1
            </Heart>
            <Scrap onClick={() => setIsScrap((prev) => !prev)}>
              {isScrap ? <AiFillFile className="fillStyled" /> : <AiOutlineFile />} 1
            </Scrap>
          </ItemInfo>
          <ContentButtons>
            <TestButton type="button" value="시험 응시하기" />
            <SaveButton type="button" value="저장하기" />
          </ContentButtons>
        </SearchResultItem>
      </SearchResultContainer>
    </div>
  );
};

export default Search;
