import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../../assets/images/logo.png';
import smallLogo from '../../../assets/images/small_logo.png';

const LogoContainer = styled(Link)<{ width: string }>`
  display: block;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
  }
`;

interface Props {
  type: 'large' | 'small';
}

const Logo = ({ type }: Props) => {
  return (
    <LogoContainer to="/" width="100px">
      <img src={type === 'small' ? smallLogo : logo} alt="logo" />
    </LogoContainer>
  );
};

export default Logo;
