import { useState } from 'react';
import { useQuery } from 'react-query';
import { getMyTest } from '../../../api/test';
import { TestListSearchData } from '../../../types/test';
import TestSearchResultItem from '../../search/TestSearchResultItem/index';
import Error from '../utils/Error';
import Loading from '../utils/Loading';
import { Container, Header } from './Style';

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
