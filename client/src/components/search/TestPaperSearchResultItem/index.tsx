import { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { colors, fonts } from '../../../styles/theme';
import SearchResultContainer from '../../common/searchResultContainer';
import TestPaper from '../../mypage/testPaper';

const stateObj = {
  SOLVING: '시험 중',
  GRADING: '채점 중',
  COMPLETE: '채점 완료',
};

const SearchResult = styled.div`
  font-size: ${fonts.size.xs};
  color: ${colors.gray4};
`;

const Title = styled.div`
  color: black;
  font-size: ${fonts.size.lg};
  font-weight: ${fonts.weight.semiBold};
  padding-bottom: 8px;
  margin-left: 4px;
`;
const NowState = styled.div``;
const Timer = styled.div``;

const CreateAt = styled.div``;
const UpdatedAt = styled.div``;

const TestPaperSearchResultItem = ({ obj }: { obj: TestPaper }) => {
  // console.log(obj);
  const { title, testPaperId, state, minutes, seconds, createdAt, updatedAt } = obj;
  const now = useMemo(() => {
    if (state === 'SOLVING') return '시험 중';
    if (state === 'GRADING') return '채점 중';
    if (state === 'COMPLETE') return '채점 완료';
    throw new Error('wrong testPaper state');
  }, []);

  // TODO : 추후 utils에 함수로 추상화 예정
  const create = useMemo(() => {
    const createDate = new Date(createdAt);
    const nowDate = new Date();
    const betweenTime = Math.floor((nowDate.getTime() - createDate.getTime()) / 1000 / 60);
    if (betweenTime < 1) return '방금전';
    if (betweenTime < 60) {
      return `${betweenTime}분전`;
    }
    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay}일전`;
    }
    return `${Math.floor(betweenTimeDay / 365)}년전`;
  }, []);

  const update = useMemo(() => {
    const updateDate = new Date(updatedAt);
    const nowDate = new Date();
    const betweenTime = Math.floor((nowDate.getTime() - updateDate.getTime()) / 1000 / 60);
    if (betweenTime < 1) return '방금전';
    if (betweenTime < 60) {
      return `${betweenTime}분전`;
    }
    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay}일전`;
    }
    return `${Math.floor(betweenTimeDay / 365)}년전`;
  }, []);

  return (
    <SearchResultContainer>
      <SearchResult>
        <Title>{title}</Title>
        <NowState>현재 상태 : {now}</NowState>
        <Timer>제한 시간 : {`${minutes}분 ${seconds}초`}</Timer>
        <CreateAt>생성일자 : {create}</CreateAt>
        <UpdatedAt>수정일자 : {update}</UpdatedAt>
      </SearchResult>
    </SearchResultContainer>
  );
};

export default TestPaperSearchResultItem;
