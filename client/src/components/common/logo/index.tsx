import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
      <img
        src={
          type === 'small'
            ? 'https://kr.object.ncloudstorage.com/asset.image/small-logo.svg'
            : 'https://kr.object.ncloudstorage.com/asset.image/logo.svg'
        }
        alt="logo"
      />
    </LogoContainer>
  );
};

export default Logo;
