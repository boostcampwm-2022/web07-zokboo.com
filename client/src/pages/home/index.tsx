import { useQuery } from 'react-query';
import { getUserData } from '../../api/user';
import Chart from '../../components/chart/Chart';
import Loading from '../../components/common/Loading';
import DashBoard from '../../components/dashboard';
import useUserData from '../../hooks/useUserData';
import KEYS from '../../react-query/keys/user';
import { GetUserInfo, Review } from '../../types/user';
import { HomeContainer, HomeTitle } from './Style';

const Home = () => {
  const userData = useUserData();

  const { data, isLoading } = useQuery<GetUserInfo>(KEYS.my, getUserData);

  const workbookCount = data?.data.workbookCount ?? 0;
  const testCount = data?.data.testCount ?? 0;
  const testPaperCount = data?.data.testPaperCount ?? 0;
  const reviewCount = data?.data.reviewCount ?? 0;

  const reviewList = data?.data.reviews ?? ([] as Review[]);

  if (isLoading) return <Loading />;

  return (
    <HomeContainer>
      <HomeTitle>
        <strong>{userData.nickname}</strong>님의 책장이에요.
      </HomeTitle>

      <DashBoard
        workbookCount={workbookCount}
        testCount={testCount}
        testPaperCount={testPaperCount}
        reviewCount={reviewCount}
      />

      <HomeTitle>최근에 활동한 정보에요.</HomeTitle>
      <Chart reviewList={reviewList} />
    </HomeContainer>
  );
};

export default Home;
