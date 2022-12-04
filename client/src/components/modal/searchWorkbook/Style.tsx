import styled from 'styled-components';
import { Button, Input, Item, List } from '../../../styles/common';
import { ProblemItem, ProblemList } from '../../../styles/problemList';
import { colors, media } from '../../../styles/theme';

export const Container = styled.div`
  height: 100%;
  padding: 30px 20px 0;

  ${media.tablet} {
    padding: 30px 20px 0;
  }
`;

export const SearchContainer = styled.div`
  height: 32px;
  margin-bottom: 10px;
`;

export const SearchInput = styled(Input)`
  width: calc(100% - 60px);
  height: 100%;
`;

export const SearchButton = styled(Button)`
  width: 50px;
  height: 100%;
`;

export const SearchWorkbookItem = styled(ProblemItem)`
  height: auto;

  border-radius: 0;
  background: none;

  padding: 0;

  transition: all 1s;
`;

export const SearchWorkbookList = styled(ProblemList)`
  height: calc(100% - 42px);

  border-radius: 0;

  ${SearchWorkbookItem} {
    cursor: pointer;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: ${colors.gray2};

  padding: 10px;
`;

export const InfoBox = styled.div`
  width: calc(100% - 80px);
`;

export const InfoTitle = styled.h3`
  margin: 0;
`;

export const InfoDesc = styled.p`
  margin: 0;

  display: inline-block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const InfoButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 30px;
  height: 30px;

  border-radius: 50%;
`;

export const QuestionList = styled(List)<{ isToggle: boolean }>`
  display: ${(props) => (props.isToggle ? `block` : `none`)};
`;

export const QuestionItem = styled(Item)`
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  width: 100%;

  margin-top: 10px;
  margin-bottom: 0px;
  padding: 10px;

  border-radius: 5px;
  background-color: ${colors.gray1};
`;
