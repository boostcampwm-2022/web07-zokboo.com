import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { media } from '../../../styles/theme';

const LogoContainer = styled(Link)<{ width: string }>`
  display: block;
  width: 100%;
  height: 100%;

  img {
    width: 350px;

    ${media.tablet} {
      width: 200px;
    }
  }
`;

interface Props {
  type: 'large' | 'small';
}

const Logo = ({ type }: Props) => {
  return (
    <LogoContainer to="/home" width="100px">
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
