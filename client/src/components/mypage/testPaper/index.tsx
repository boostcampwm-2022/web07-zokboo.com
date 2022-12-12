import { useQuery } from 'react-query';
import getTestPaper from '../../../api/testpaper';
import Loading from '../utils/Loading';
import { Header, Main, WorkbookContainer } from './Style';

const TestPaper = () => {
  const { isLoading, isSuccess, isError, data } = useQuery(['testPaper/my'], getTestPaper, {
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
