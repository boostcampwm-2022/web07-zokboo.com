import styled from 'styled-components';
import ButtonComponent from '../../components/common/Button';
import { colors, fonts } from '../../styles/theme';

export const PageBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(https://cdn.shopify.com/s/files/1/0336/3763/0092/articles/2022_02_0.jpg?v=1650323151);
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.5;
`;

export const Logo = styled.img`
  width: 100%;
`;

export const Content = styled.div`
  margin: 10px;
  font-size: ${fonts.size.sm};
  color: ${colors.gray4};
  line-height: 200%;
`;

export const LoginButton = styled(ButtonComponent)`
  font-size: 100px;
`;

export const Copyright = styled.div`
  margin-top: 32px;
  font-size: ${fonts.size.xs};
  color: ${colors.gray4};
`;
