import styled from 'styled-components';
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

  font-weight: ${fonts.weight.bold};
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

export const CreateModalButton = styled.button<{ isActive: boolean; isDisplay: boolean }>`
  ${(props) => (props.isDisplay ? `opacity: 1; cursor: pointer;` : `opacity: 0;`)}

  width: 100px;
  height: 40px;

  margin-right: 10px;

  transition: background 0.5s;

  border-radius: 10px;
  ${(props) =>
    props.isActive
      ? `border: 1px solid ${colors.primary}; background-color:${colors.primary};`
      : `border: 1px solid ${colors.primary}; background-color:${colors.white};`}

  :hover {
    border: 1px solid ${colors.primary};
    background-color: ${colors.primary};
  }
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

  svg {
    width: 100px;
    height: 100px;
  }
`;

export const CreateModalStep = styled.div`
  font-size: ${fonts.size.xl};

  ${CreateModalLabel}, ${CreateModalTitleBox} {
    margin-top: 10px;
  }

  ${CreateModalLabel} textarea,
  ${CreateModalLabel} ${CreateModalImageBox}, 
  ${CreateModalContentBox} {
    margin-top: 10px;
  }
`;

export const CreateModalAddButton = styled.button`
  width: 100%;
  height: 30px;

  border: 1px solid ${colors.line};
  cursor: pointer;

  font-size: ${fonts.size.lg};
`;

export const CreateModalQuestionBox = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  margin: 5px 0;

  input {
    width: calc(100% - 55px);
    height: 40px;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;

    border: none;
    background: none;

    cursor: pointer;

    width: 40px;
    height: 40px;

    padding: 0;
  }
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
