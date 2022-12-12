import { useState } from 'react';
import { useQuery } from 'react-query';
import { getMyTest } from '../../../api/test';
import { TestListSearchData } from '../../../types/test';
import SearchResultItem from '../../search/SearchResultItem';
import TestSearchResultItem from '../../search/TestSearchResultItem';

const Test = () => {
  const [testData, setTestData] = useState<TestListSearchData[]>([]);
  const { data, isLoading, isSuccess } = useQuery(['tests/my'], getMyTest, {
    onSuccess: (d) => {
      setTestData(d.data);
    },
  });

  return (
    <div>
      <div>test</div>
      {isLoading && <div>로딩중</div>}
      {isSuccess && testData.length !== 0
        ? testData.map((test, idx) => (
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
        : 'aa'}
    </div>
  );
};

export default Test;
