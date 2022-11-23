import styled from 'styled-components';
import { Button, Input } from '../../../styles/common';
import { colors, fonts } from '../../../styles/theme';

export const CreateModalContainer = styled.div`
  display: flex;

  height: 100%;
`;

export const CreateModalStepContainer = styled.div`
  width: calc(100% - 50px);

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  box-sizing: border-box;
  padding-top: 30px;
`;

export const CreateModalLabel = styled.label`
  display: block;

  cursor: pointer;
`;

export const CreateModalTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CreateModalContentBox = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

export const CreateModalButton = styled(Button)<{ isActive: boolean; isDisplay: boolean }>`
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

export const CreateModalButtonList = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CreateModalImageBox = styled.div`
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

export const CreateModalStep = styled.div`
  font-size: ${fonts.size.xl};
`;

export const CreateModalAddButton = styled(Button)`
  width: 100%;
  height: 40px;

  padding: 5px;

  font-size: ${fonts.size.lg};
`;

export const CreateModalQuestionBox = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  margin: 5px 0;
`;

export const CreateModalQuestionInput = styled(Input)`
  width: calc(100% - 55px);
  height: 40px;
`;

export const CreateModalQuestionButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;

  border: none;
  background: none;

  width: 40px;
  height: 40px;

  color: ${colors.text};
`;

export const CreateModalStepBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 50px;
  height: 100%;
`;

export const CreateModalStepBarItem = styled.div<{ isActive: boolean }>`
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
