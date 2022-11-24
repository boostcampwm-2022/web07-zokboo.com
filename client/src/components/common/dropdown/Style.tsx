import styled from 'styled-components';
import { Item, List } from '../../../styles/common';
import { colors, fonts } from '../../../styles/theme';
import DIREACTION from './Types';

export const Container = styled.div`
  position: relative;

  width: 100%;
`;

export const Selector = styled.summary`
  display: flex;
  flex-direction: row;
  width: 100%;

  gap: 4px;
  ::marker {
    display: none;
    content: '';
  }
`;

export const DropdownList = styled(List)<{ direction: DIREACTION }>`
  position: absolute;
  bottom: -10px;
  ${(props) => props.direction}: 0;
  transform: translateY(100%);

  display: flex;
  flex-direction: column;

  width: 150px;

  border: 1px solid #afb8c1;
  border-radius: 8px;

  background-color: ${colors.offWhite};
`;

export const DropdownItem = styled(Item)`
  margin: 0;
  padding: 5px 10px;

  font-size: ${fonts.size.sm};
  border-bottom: 1px solid ${colors.line};

  :last-child {
    border: none;
  }
`;
