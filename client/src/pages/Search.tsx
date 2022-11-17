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

const researchMockData = [
  {
    workbook_id: 1,
    title: 'CS 면접대비',
    creator_id: 'CS마스터',
    create_at: '20221117',
    description: 'CS면접대비를 위한 문제집입니다 많이 데여보고 만들어봤습니다.',
  },
  {
    workbook_id: 2,
    title: '자료구조 마스터 가보자구',
    creator_id: 'rlarjsdn',
    create_at: '20221116',
    description: '다풀면 자료구조 에이플 쌉가능',
  },
  {
    workbook_id: 3,
    title: '미분방정식 날먹하고싶어요',
    creator_id: '준이허',
    create_at: '20221114',
    description: '이거 시험에 무조건 나옵니다.',
  },
  {
    workbook_id: 4,
    title: '받아쓰기 대비 문제집',
    creator_id: '어쩔냉장고',
    create_at: '20221113',
    description: '받아쓰기 백점맞아 얘들아',
  },
  {
    workbook_id: 5,
    title: '정보처리기사 실기대비',
    creator_id: '정처기시험5번본사람',
    create_at: '20221111',
    description: '정처기 한번에 붙으시길 바랍니다.',
  },
];
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
        {researchMockData.map((x, i) => (
          <SearchResultItem
            key={x.workbook_id}
            title={x.title}
            creatorId={x.creator_id}
            createAt={x.create_at}
            description={x.description}
          />
        ))}
      </SearchResultContainer>
    </div>
  );
};

export default Search;
