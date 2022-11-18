import styled from 'styled-components';
import { colors, fonts } from '../../../styles/theme';

export const MainTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 200px;

  text-align: center;
  background-color: ${colors.offWhite};
`;

export const MainTitleHeader = styled.h1`
  font-size: ${fonts.size.xxl};

  margin: 0;
`;
