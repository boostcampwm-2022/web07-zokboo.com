import styled from 'styled-components';
import { Button, Item, List } from './common';
import { colors, fonts } from './theme';

export const ProblemList = styled(List)`
  width: 100%;
  height: 460px;

  box-sizing: border-box;
  padding: 0px 10px;

  border: 2px solid ${colors.gray2};
  border-radius: 10px;
`;
export const ProblemItem = styled(Item)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  height: 100px;

  padding: 10px;

  background-color: ${colors.gray1};
  border-radius: 10px;
`;

export const ProblemItemTitle = styled.h3`
  display: inline-block;
  width: 90%;
  height: 2.4em;
  line-height: 1.2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  font-size: ${fonts.size.sm};
  margin: 0;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  white-space: normal;
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
`;

export const ProblemItemUnderLine = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ProblemItemHashTagList = styled.div`
  width: calc(100% - 55px);

  display: flex;
  justify-content: flex-start;
`;

export const ProblemItemHashTagItem = styled.span`
  display: inline-block;

  box-sizing: border-box;
  margin-right: 5px;

  width: 60px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;

  font-size: ${fonts.size.xs};
`;

export const ProblemItemButton = styled(Button)`
  width: 55px;
  height: 30px;

  font-size: ${fonts.size.xs};
`;
