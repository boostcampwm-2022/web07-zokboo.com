import styled from 'styled-components';
import { Button, Input, TextArea } from '../../styles/common';
import { device, fonts, paddings, widths } from '../../styles/theme';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;

  ${widths.base};

  box-sizing: border-box;
  padding: ${paddings.responsive};

  margin: 80px auto 20px;

  @media screen and (max-width: ${device.tablet}) {
    width: ${widths.responsive};
    margin: 20px auto 20px;

    flex-wrap: wrap-reverse;
  }
`;

export const QuestionListContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 45%;

  @media screen and (max-width: ${device.tablet}) {
    width: ${widths.responsive};
  }
`;

export const InfoContainer = styled.form`
  width: 45%;

  @media screen and (max-width: ${device.tablet}) {
    margin-top: 20px;
    width: ${widths.responsive};
  }
`;

export const InfoItem = styled.div`
  margin-bottom: 16px;
`;

export const InfoToggle = styled.div`
  width: 40px;
  height: 20px;
`;

export const InfoInput = styled(Input)`
  width: 100%;
  height: 48px;

  border-radius: 5px;

  box-sizing: border-box;
  padding: 0px 16px;
`;

export const InfoTextArea = styled(TextArea)`
  width: 100%;
  height: 80px;

  border-radius: 5px;

  box-sizing: border-box;
  padding: 8px 16px;
`;

export const ButtonList = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const InfoButton = styled(Button)`
  display: block;

  width: 200px;
  height: 50px;

  margin: 50px auto 0;
`;

export const ListButton = styled(Button)`
  width: 100px;
  height: 30px;

  font-size: ${fonts.size.xs};

  margin: 0px 0 10px 10px;
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
