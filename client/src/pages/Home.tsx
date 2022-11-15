import styled from 'styled-components';

import DashBoard from '../components/dashboard/DashBoard';
import { device } from '../styles/theme';

const HomeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  width: 70%;
  margin: 200px auto 0px;

  @media screen and (max-width: ${device.tablet}) {
    width: 100%;
    margin: 50px auto 0px;
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <DashBoard title="제목" moreLink="/" createLink="/" />
      <DashBoard title="제목" moreLink="/" createLink="/" />
      <DashBoard title="제목" moreLink="/" createLink="/" />
      <DashBoard title="제목" moreLink="/" createLink="/" />
    </HomeContainer>
  );
};

export default Home;
