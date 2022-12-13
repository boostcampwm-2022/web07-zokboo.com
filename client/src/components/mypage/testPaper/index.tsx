import { useQuery } from 'react-query';
import { getMyTestPaper } from '../../../api/testpaper';
import Error from '../../common/utils/Error';
import Loading from '../../common/utils/Loading';
import { Header, Main, WorkbookContainer } from './Style';

const TestPaper = () => {
  const { isLoading, isSuccess, isError, data } = useQuery(['testPaper/my'], getMyTestPaper, {
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
        {isError && <Error message="시험지를 불러올 수 없습니다. J021에게 문의해주세요." />}
      </Main>
    </WorkbookContainer>
  );
};

export default TestPaper;
