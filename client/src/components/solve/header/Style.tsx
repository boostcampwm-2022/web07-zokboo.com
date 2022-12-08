import styled from 'styled-components';
import { colors, fonts } from '../../../styles/theme';

export const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;

  z-index: 5;

  width: 100%;

  background-color: ${colors.secondary};
  padding: 10px 15px;
`;

export const Inner = styled.div`
  display: flex;
`;

export const LogoBox = styled.div`
  width: 30px;
  height: 30px;
`;

export const Title = styled.h2`
  margin: 0;
  margin-left: 10px;

  font-size: ${fonts.size.sm};
`;
