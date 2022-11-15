import styled from 'styled-components';
import DashBoard from '../components/dashboard/DashBoard';

import { colors, device } from '../styles/theme';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 80%;

  box-sizing: border-box;
  margin: 100px auto 0px;
  padding: 20px;

  @media screen and (max-width: ${device.tablet}) {
    width: 100%;
    margin: 50px auto 0px;
  }
`;

const HomeTitle = styled.h1`
  font-size: 28px;

  span {
    color: ${colors.primary};
  }
`;

const HomeChart = styled.div`
  width: 100%;
  height: 400px;

  background-color: ${colors.gray};
`;

const Home = () => {
  return (
    <HomeContainer>
      <HomeTitle>
        <span>회원</span>님의 책장이에요.
      </HomeTitle>

      <DashBoard />

      <HomeChart>차트 같은거 있으면 어떨까?</HomeChart>
    </HomeContainer>
  );
};

export default Home;
