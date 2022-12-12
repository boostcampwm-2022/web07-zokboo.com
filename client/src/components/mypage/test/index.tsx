import { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getMyTest } from '../../../api/test';
import { fonts } from '../../../styles/theme';
import { TestListSearchData } from '../../../types/test';
import TestSearchResultItem from '../../search/TestSearchResultItem';
import Error from '../utils/Error';
import Loading from '../utils/Loading';

const Container = styled.div`
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

const Test = () => {
  const [testData, setTestData] = useState<TestListSearchData[]>([]);
  const { data, isLoading, isSuccess } = useQuery(['tests/my'], getMyTest, {
    onSuccess: (d) => {
      setTestData(d.data);
    },
  });

  return (
    <Container>
      <Header>나의 시험</Header>
      {isLoading && <Loading />}
      {isSuccess && testData.length !== 0 ? (
        testData.map((test, idx) => (
          <TestSearchResultItem
            key={test.testId}
            testId={test.testId}
            title={test.title}
            totalCount={test.totalCount}
            minutes={test.minutes}
            seconds={test.seconds}
            workbooks={test.workbooks}
          />
        ))
      ) : (
        <Error title="생성한 시험이 없습니다." />
      )}
    </Container>
  );
};

export default Test;
