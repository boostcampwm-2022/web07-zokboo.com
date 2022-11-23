import styled from 'styled-components';
import { Button, Input, SubTitle } from '../../../styles/common';
import { colors, fonts } from '../../../styles/theme';

export const Container = styled.div`
  display: flex;

  height: 100%;
`;

export const StepContainer = styled.div`
  width: calc(100% - 50px);

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  box-sizing: border-box;
  padding-top: 30px;
`;

export const Label = styled.label`
  display: block;

  cursor: pointer;
`;

export const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ContentBox = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

export const ModalButton = styled(Button)<{ isActive: boolean; isDisplay: boolean }>`
  ${(props) => (props.isDisplay ? `opacity: 1;` : `cursor:default; opacity: 0;`)}

  width: 100px;
  height: 40px;

  margin-right: 10px;

  transition: background 0.5s;

  border: 1px solid ${colors.primary};
  border-radius: 10px;

  ${(props) =>
    props.isActive
      ? `background-color:${colors.primary};  color: ${colors.white};`
      : `background-color:${colors.white};  color: ${colors.primary};`}
`;

export const ButtonList = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 150px;

  background-color: ${colors.white};
  border: 1px solid ${colors.line};

  margin-bottom: 10px;

  svg {
    width: 100px;
    height: 100px;
  }
`;

export const Step = styled.div`
  font-size: ${fonts.size.xl};
`;

export const AddButton = styled(Button)`
  width: 100%;
  height: 40px;

  padding: 5px;

  font-size: ${fonts.size.lg};
`;

export const QuestionBox = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  margin: 5px 0;
`;

export const QuestionInput = styled(Input)`
  width: calc(100% - 55px);
  height: 40px;
`;

export const QuestionButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;

  border: none;
  background: none;

  width: 40px;
  height: 40px;

  color: ${colors.text};
`;

export const StepBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 50px;
  height: 100%;
`;

export const StepBarItem = styled.div<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  svg {
    transition: all 0.5s;
    margin: 10px 0;
    color: ${(props) => (props.isActive ? colors.primary : colors.line)};

    :last-child {
      cursor: pointer;
    }
  }
`;

export const DropDownContainer = styled.div`
  width: 200px;
`;

export const DropDownSelector = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  cursor: pointer;

  border: 1px solid ${colors.primary};
  border-radius: 5px;

  :hover ${Button} {
    color: ${colors.white};
    background-color: ${colors.primary};
  }
`;

export const DropDownTitle = styled(SubTitle)`
  width: calc(100% - 30px);
  font-size: ${fonts.size.sm};

  margin: 0;
`;

export const DropDownIcon = styled(Button)`
  width: 30px;
  height: 30px;

  padding: 0;

  border: none;

  border-radius: 0 5px 5px 0;
`;
