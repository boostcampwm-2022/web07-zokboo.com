import styled from 'styled-components';
import { colors, fonts } from '../../styles/theme';

export const Container = styled.div``;

export const Title = styled.h1`
  margin: 0;
  font-size: ${fonts.size.xxl};

  strong {
    color: ${colors.primary};
  }
`;

export const Contents = styled.p`
  margin: 5px 0 0;
  font-size: ${fonts.size.lg};
`;

export const Inner = styled.div<{ isShow: boolean }>`
  display: ${(props) => (props.isShow ? `flex` : `none`)};

  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 100%;
  height: 100vh;
`;

export const LoadingContainer = styled.div`
  height: 50px;
`;
