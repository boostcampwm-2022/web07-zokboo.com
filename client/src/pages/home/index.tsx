import { useQuery } from 'react-query';
import Chart from '../../components/chart/Chart';
import DashBoard from '../../components/dashboard';
import useUserData from '../../hooks/useUserData';
import KEYS from '../../react-query/keys/user';
import { HomeContainer, HomeTitle } from './Style';

const Home = () => {
  const userData = useUserData();

  // const {data} = useQuery(KEYS.my, )

  return (
    <HomeContainer>
      <HomeTitle>
        <strong>{userData.nickname}</strong>님의 책장이에요.
      </HomeTitle>

      <DashBoard />

      <HomeTitle>최근에 활동한 정보에요.</HomeTitle>
      <Chart />
    </HomeContainer>
  );
};

export default Home;
