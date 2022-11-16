import styled from 'styled-components';
import Chart from '../components/chart/Chart';
import DashBoard from '../components/dashboard/DashBoard';

import { colors, device, fonts, paddings } from '../styles/theme';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 80%;

  box-sizing: border-box;
  margin: 100px auto 0px;
  padding: ${paddings.responsive};

  @media screen and (max-width: ${device.tablet}) {
    width: 100%;
    margin: 50px auto 0px;
  }
`;

const HomeTitle = styled.h1`
  font-size: ${fonts.size.xxl};
  span {
    color: ${colors.primary};
  }
`;

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
