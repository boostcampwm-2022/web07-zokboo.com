import styled from 'styled-components';
import { Button, Input, Item, List } from '../../styles/common';
import { colors, device, fonts, paddings, widths } from '../../styles/theme';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;

  width: ${widths.base};

  box-sizing: border-box;
  padding: ${paddings.responsive};

  margin: 80px auto 20px;

  @media screen and (max-width: ${device.tablet}) {
    width: ${widths.responsive};
    margin: 20px auto 20px;

    flex-wrap: wrap-reverse;
  }
`;

export const ProblemListContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 45%;

  @media screen and (max-width: ${device.tablet}) {
    width: ${widths.responsive};
  }
`;

export const Form = styled.form`
  width: 45%;

  @media screen and (max-width: ${device.tablet}) {
    width: ${widths.responsive};
  }
`;

export const FormItem = styled.div`
  margin-bottom: 16px;
`;

export const FormToggle = styled.div`
  width: 40px;
  height: 20px;
`;

export const FormInput = styled(Input)`
  width: 100%;
  height: 48px;

  border-radius: 5px;

  box-sizing: border-box;
  padding: 0px 16px;
`;

export const ButtonList = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const FormButton = styled(Button)`
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

export const ProblemItemButton = styled(Button)`
  width: 55px;
  height: 30px;

  font-size: ${fonts.size.xs};
`;
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
