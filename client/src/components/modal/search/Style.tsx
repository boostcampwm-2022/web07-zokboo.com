import styled from 'styled-components';
import { Button, Input } from '../../../styles/common';
import { ProblemList } from '../../../styles/problemList';
import { colors, fonts, media } from '../../../styles/theme';
import { DropDownContainer } from '../create/Style';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 100%;
  padding: 30px 20px;

  ${media.tablet} {
    padding: 30px 20px 0;
  }
`;

export const SearchDropDownContainer = styled(DropDownContainer)`
  width: 150px;
`;

export const SearchBox = styled.div`
  display: flex;
  justify-content: space-between;

  height: 32px;
  margin-bottom: 10px;
`;

export const SearchInput = styled(Input)`
  width: calc(100% - 150px - 60px);
  height: 100%;
`;

export const SearchButton = styled(Button)`
  width: 50px;
  height: 100%;
`;

export const SearchProblemList = styled(ProblemList)`
  height: calc(100% - 45px);
`;
