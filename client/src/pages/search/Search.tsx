import React, { useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/header/Header';
import SearchResultItem from '../../components/search/SearchResultItem';
import { CREATOR, WORKBOOK_NAME } from './constants';
import { RadioContainer, SearchResultContainer, SearchResultTitle, TitleContainer } from './Style';

const researchMockData = [
  {
    workbook_id: 1,
    title: 'CS 면접대비',
    creator_id: 'CS마스터',
    create_at: '20221117',
    description: 'CS면접대비를 위한 문제집입니다 많이 데여보고 만들어봤습니다.',
    like: true,
    scrap: 1,
  },
  {
    workbook_id: 2,
    title: '자료구조 마스터 가보자구',
    creator_id: 'rlarjsdn',
    create_at: '20221116',
    description: '다풀면 자료구조 에이플 쌉가능',
    like: true,
    scrap: 1,
  },
  {
    workbook_id: 3,
    title: '미분방정식 날먹하고싶어요',
    creator_id: '준이허',
    create_at: '20221114',
    description: '이거 시험에 무조건 나옵니다.',
    like: false,
    scrap: 1,
  },
  {
    workbook_id: 4,
    title: '받아쓰기 대비 문제집',
    creator_id: '어쩔냉장고',
    create_at: '20221113',
    description: '받아쓰기 백점맞아 얘들아',
    like: true,
    scrap: 1,
  },
  {
    workbook_id: 5,
    title: '정보처리기사 실기대비',
    creator_id: '정처기시험5번본사람',
    create_at: '20221111',
    description: '정처기 한번에 붙으시길 바랍니다.',
    like: false,
    scrap: 1,
  },
];

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchOption, setSearchOption] = useState<string>(WORKBOOK_NAME);
  const searchWord = searchParams.get('q');

  const handleSearchOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchOption(e.target.value);
  };

  return (
    <div>
      <Header />
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
        {researchMockData.map((x, i) => (
          <SearchResultItem
            key={x.workbook_id}
            id={x.workbook_id}
            title={x.title}
            creatorId={x.creator_id}
            createAt={x.create_at}
            description={x.description}
            like={x.like}
          />
        ))}
      </SearchResultContainer>
    </div>
  );
};

export default Search;
