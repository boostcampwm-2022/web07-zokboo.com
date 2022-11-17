import Chart from '../../components/chart/Chart';
import DashBoard from '../../components/dashboard/DashBoard';
import { HomeContainer, HomeTitle } from './Style';

const Home = () => {
  return (
    <HomeContainer>
      <HomeTitle>
        <span>회원</span>님의 책장이에요.
      </HomeTitle>

      <DashBoard />

      <HomeTitle>최근에 활동한 정보에요.</HomeTitle>
      <Chart />
    </HomeContainer>
  );
};

export default Home;
