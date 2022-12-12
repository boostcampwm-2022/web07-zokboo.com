import { useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import getTestPaper from '../../../api/testpaper';
import { getMyWorkbookData } from '../../../api/workbook';
import { fonts } from '../../../styles/theme';
import Loading from '../utils/Loading';

const WorkbookContainer = styled.div`
  width: 100%;
  height: 100%;
`;
const Header = styled.div`
  font-size: ${fonts.size.xl};
  font-weight: ${fonts.weight.normal};
`;

const Main = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: ${fonts.weight.bold};
  font-size: ${fonts.size.xl};
`;

const TestPaper = () => {
  const { isLoading, isSuccess, isError, data, error } = useQuery(['testPaper/my'], getTestPaper, {
    onSuccess: (d) => {
      console.log(d.msg);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <WorkbookContainer>
      <Header>나의 시험지</Header>
      <Main>
        {isLoading && <Loading />}
        {isSuccess && '성공' /** api 받으면 구현예정 */}
        {isError && 'error'}
      </Main>
    </WorkbookContainer>
  );
};

export default TestPaper;
