import { useQuery } from 'react-query';
import { getMyTestPaper } from '../../../api/testpaper';
import Error from '../../common/utils/Error';
import Loading from '../../common/utils/Loading';
import { Header, Main, WorkbookContainer } from './Style';

const Review = () => {
  const { isLoading, isSuccess, isError, data } = useQuery(['testPaper/my'], getMyTestPaper /** api 수정 예정 */, {
    onSuccess: (d) => {
      console.log(d.msg);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <WorkbookContainer>
      <Header>나의 오답노트</Header>
      <Main>
        {isLoading && <Loading />}
        {isSuccess && '성공' /** api 받으면 구현예정 */}
        {isError && <Error emoji="🫠" message="오답노트를 불러올 수 없습니다. J021에게 문의해주세요." />}
      </Main>
    </WorkbookContainer>
  );
};

export default Review;
