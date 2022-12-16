import { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getMyTestPaper } from '../../../api/testpaper';
import { GetTestQuestionResponse } from '../../../types/question';
import { GetTestPaperResponse, TestType } from '../../../types/test';
import Error from '../../common/utils/Error';
import Loading from '../../common/utils/Loading';
import TestPaperSearchResultItem from '../../search/TestPaperSearchResultItem';
import { Header, Main, WorkbookContainer } from './Style';

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;
interface TestPaper {
  testPaperId: number;
  title: string;
  minutes: number;
  seconds: number;
  createdAt: string;
  updatedAt: string;
  state: TestType;
  questions: GetTestQuestionResponse[];
}

const TestPaper = () => {
  const [testPaperData, setTestPaperData] = useState<TestPaper[]>([]);
  const { isLoading, isSuccess, isError, data } = useQuery(['testPaper/my'], getMyTestPaper, {
    onSuccess: (d) => {
      console.log(d.msg);
      setTestPaperData(d.data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <Container>
      <Header>나의 시험지</Header>
      {isLoading && <Loading />}
      {isSuccess && testPaperData.length !== 0
        ? testPaperData
            .slice(0)
            .reverse()
            .map((testPaper, idx) => <TestPaperSearchResultItem key={testPaper.testPaperId} obj={testPaper} />)
        : null}
      {isError && <Error emoji="😓" message="Error! 시험지를 불러올 수 없습니다. J021에게 문의해주세요." />}
    </Container>
  );
};

export default TestPaper;
