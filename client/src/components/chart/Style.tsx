import styled from 'styled-components';
import { colors } from '../../styles/theme';

export const Container = styled.div<{ bgColor: string }>`
  position: relative;

  width: 100%;
  height: 400px;

  padding: 20px;
  margin: 25px 0 10px 0;

  box-sizing: border-box;

  background-color: ${(props) => props.bgColor};
  border-radius: 0 10px 10px 10px;
`;

export const ChartToggle = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;

  width: 40px;
  height: 20px;
`;

export const Category = styled.button`
  position: absolute;
  top: -25px;
  left: 0;

  width: 120px;
  height: 25px;

  border: none;
  border-radius: 10px 10px 0 0;
  background-color: ${colors.gray1};

  text-align: center;
  cursor: pointer;

  :nth-child(2) {
    left: 120px;
    background-color: ${colors.gray2};
  }
  :nth-child(3) {
    left: 240px;
    background-color: ${colors.gray3};
  }
`;
