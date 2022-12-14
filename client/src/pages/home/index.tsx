import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Chart from '../../components/chart/Chart';
import DashBoard from '../../components/dashboard';
import { useAppSelector } from '../../redux/hooks';
import selectUserData from '../../redux/login/selector';
import { HomeContainer, HomeTitle } from './Style';

const Home = () => {
  const navigate = useNavigate();
  const userData = useAppSelector(selectUserData);

  useEffect(() => {
    if (!userData.isLogined) {
      navigate('/init');
    }
  }, []);
  return (
    <HomeContainer>
      <HomeTitle>
        <strong>회원</strong>님의 책장이에요.
      </HomeTitle>

      <DashBoard />

      <HomeTitle>최근 활동한 정보에요.</HomeTitle>
      <Chart />
    </HomeContainer>
  );
};

export default Home;
