import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/images/logo.png';

const LogoContainer = styled(Link)<{ width: string }>`
  width: 100%;

  img {
    width: 100%;
  }
`;

const Logo = () => {
  return (
    <LogoContainer to="/" width="100px">
      <img src={logo} alt="logo" />
    </LogoContainer>
  );
};

export default Logo;
