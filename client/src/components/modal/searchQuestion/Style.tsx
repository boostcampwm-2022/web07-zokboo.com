import styled from 'styled-components';
import { Button, Input } from '../../../styles/common';
import { ProblemItem, ProblemList } from '../../../styles/problemList';
import { fonts, media } from '../../../styles/theme';
import { DropDownContainer } from '../createQuestion/Style';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 100%;
  padding: 30px 20px 0;

  ${media.tablet} {
    padding: 30px 20px 0;
  }
`;

export const SearchDropDownContainer = styled(DropDownContainer)`
  width: 150px;
`;

export const SearchContainer = styled.div`
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
  height: calc(100% - 42px);

  ${ProblemItem} {
    cursor: pointer;
  }
`;

export const QuestionType = styled.div<{ type: boolean }>`
  width: 120px;
  height: 25px;

  font-size: ${fonts.size.sm};
  font-weight: ${fonts.weight.semiBold};
  background-color: ${(props) => (props.type ? '#FEF2C0' : '#E99695')};
  color: black;

  padding: 1px 7px;
  border-radius: 2em;
  margin: 0px 10px;
`;

export const QuestionBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
