import styled from 'styled-components';
import { Button, Input } from '../../../styles/common';
import { colors, fonts, media } from '../../../styles/theme';

export const Container = styled.div`
  height: 100%;
  padding: 30px 20px;

  ${media.tablet} {
    padding: 0 20px;
  }
`;

export const SearchBox = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 10px;
`;

export const SearchInput = styled(Input)`
  height: 30px;
  width: calc(100% - 60px);
`;

export const SearchButton = styled(Button)`
  width: 50px;
  height: 30px;
`;
