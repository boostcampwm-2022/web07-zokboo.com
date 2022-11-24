import styled from 'styled-components';
import { Button, Input, SubTitle, TextArea } from '../../../styles/common';
import { colors, fonts, media } from '../../../styles/theme';

export const Container = styled.div`
  display: flex;

  height: 100%;
  padding: 0 20px 0 0;

  ${media.tablet} {
    padding: 0 20px;
  }
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
  height: 100px;

  background-color: ${colors.white};
  border: 1px solid ${colors.line};

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
  position: relative;

  display: flex;
  justify-content: space-between;

  width: 100%;
  margin: 5px 0;
`;

export const HashTagItemBox = styled.div`
  position: relative;
`;

export const HashTagItem = styled.div`
  font-size: ${fonts.size.sm};
  margin: 0 5px 5px;
`;

export const QuestionInput = styled(Input)`
  width: calc(100% - 55px);
  height: 40px;
`;

export const HashTagBox = styled.div`
  width: 50%;

  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
`;

export const HashTagButton = styled(Button)`
  width: 40px;
  height: 40px;

  font-size: ${fonts.size.xs};
`;

export const QuestionButton = styled(Button)<{ isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  border: none;
  background: none;

  width: 40px;
  height: 40px;

  color: ${colors.text};

  ${(props) =>
    props.isActive &&
    `color: ${colors.white};
    background-color: ${colors.primary};`}
`;

export const DeleteButton = styled(Button)`
  position: absolute;
  left: -10px;
  top: -10px;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 20px;
  height: 20px;

  color: ${colors.error};
  background-color: ${colors.white};
  border-radius: 50%;

  border: none;
  background: none;

  padding: 0;

  :hover {
    color: ${colors.error};

    border: none;
    background: none;
  }
`;

export const StepBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 60px;
  height: 100%;

  ${media.tablet} {
    display: none;
  }
`;

export const StepBarItem = styled.div<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${Button} {
    ${(props) =>
      props.isActive
        ? `
    color: ${colors.white};
    border: 1px solid ${colors.primary};
    background-color: ${colors.primary};
  `
        : `
    color:${colors.line};
    border: 1px solid ${colors.line};
  `};
  }

  svg {
    transition: all 0.5s;
    margin: 10px 0;
    color: ${(props) => (props.isActive ? colors.primary : colors.line)};

    :last-child {
      cursor: pointer;
    }
  }
`;

export const StepBarButton = styled(Button)`
  width: 30px;
  height: 30px;

  border-radius: 50%;

  :hover {
    color: ${colors.white};
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

export const StepContainer = styled.div`
  width: calc(100% - 60px);

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  box-sizing: border-box;

  padding-top: 30px;

  ${media.tablet} {
    width: calc(100%);
  }

  ${ContentBox},${TextArea}, ${ImageBox} {
    margin-bottom: 30px;
  }
`;
