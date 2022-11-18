import styled from 'styled-components';
import { colors, device, fonts, paddings, widths } from '../../styles/theme';

export const ProblemCreateContainer = styled.div`
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

export const ProblemCreateForm = styled.form`
  width: 45%;

  @media screen and (max-width: ${device.tablet}) {
    width: ${widths.responsive};
  }
`;

export const ProblemCreateFormItem = styled.div`
  h2 {
    font-size: ${fonts.size.xl};
    margin: 24px 0 16px;
  }
`;

export const ProblemCreateFormToggle = styled.div`
  width: 40px;
  height: 20px;
`;

export const ProblemCreateFormInput = styled.input`
  width: 100%;
  height: 48px;

  color: ${colors.text};
  font-size: ${fonts.size.sm};

  border: 1px solid ${colors.line};
  border-radius: 5px;

  box-sizing: border-box;
  padding: 0px 16px;

  ::placeholder {
    color: ${colors.placeholder};
  }

  :focus {
    outline: none;
  }
`;

export const ProblemCreateFormButton = styled.div`
  text-align: center;

  margin-top: 50px;
`;

export const ProblemCreateButtonList = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ProblemCreateButton = styled.div`
  margin: 24px 0 10px 10px;
`;

export const ProblemList = styled.div`
  width: 100%;
  height: 460px;

  box-sizing: border-box;
  padding: 0px 10px;

  border: 2px solid ${colors.gray2};
  border-radius: 10px;

  overflow-y: scroll;
`;
export const ProblemItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  height: 100px;

  box-sizing: border-box;
  padding: 10px;

  margin: 10px 0;

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
