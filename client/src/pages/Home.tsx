import styled from 'styled-components';
import DashBoard from '../components/dashboard/DashBoard';

import { colors, device, fonts, paddings, widths } from '../styles/theme';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: ${widths.base};

  box-sizing: border-box;
  margin: 100px auto 0px;
  padding: ${paddings.responsive};

  @media screen and (max-width: ${device.tablet}) {
    width: ${widths.responsive};
    margin: 50px auto 0px;
  }
`;

const HomeTitle = styled.h1`
  font-size: ${fonts.size.xxl};
  span {
    color: ${colors.primary};
  }
`;

const HomeChart = styled.div`
  width: 100%;
  height: 400px;

  background-color: ${colors.gray1};
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
