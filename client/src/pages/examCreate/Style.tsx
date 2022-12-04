import styled from 'styled-components';
import { Button, Input, Item, List } from '../../styles/common';
import { colors, fonts, media, paddings, widths } from '../../styles/theme';

export const Container = styled.div`
  ${widths.base};
  padding: ${paddings.responsive};

  margin: 0 auto;

  ${media.tablet} {
    width: 100%;
  }
`;

export const InfoContainer = styled.div`
  display: flex;

  margin: 30px 0 50px;

  ${media.tablet} {
    flex-wrap: wrap;
  }
`;

export const InfoBox = styled.div`
  width: 50%;

  padding: 20px;
  margin-top: 20px;

  ${media.tablet} {
    width: 100%;
    padding: 0;
  }
`;

export const InfoInput = styled(Input)`
  width: 100%;
  height: 48px;

  border-radius: 5px;

  box-sizing: border-box;
  padding: 0px 16px;
`;

export const InfoInputBox = styled.div`
  display: flex;
`;

export const InfoTimeInput = styled(InfoInput)`
  width: calc(50% - 5% - 10px);
`;

export const InfoText = styled.p`
  display: flex;
  align-items: flex-end;

  width: 5%;
  margin: 0 5px;

  font-size: ${fonts.size.lg};
  font-weight: ${fonts.weight.bold};
`;

export const WorkbookContainer = styled.div`
  padding: 20px;

  ${media.tablet} {
    padding: 0;
  }
`;

export const WorkbookBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
`;

export const WorkbookList = styled(List)``;

export const WorkbookHeader = styled(Item)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: ${fonts.size.lg};
  font-weight: ${fonts.weight.bold};

  padding: 20px;

  background-color: ${colors.secondary};
`;

export const WorkbookItem = styled(Item)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: ${colors.line};

  padding: 10px 20px;
`;

export const WorkbookInfo = styled.div`
  width: 40%;

  ${media.tablet} {
    width: calc(100% - 70px);
  }
`;

export const WorkbookTitle = styled.p`
  display: inline-block;
  width: calc(100% - 50px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  font-size: ${fonts.size.lg};
  font-weight: ${fonts.weight.bold};

  margin: 5px 0;
`;

export const WorkbookDesc = styled.p`
  display: inline-block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  margin: 0;
`;

export const WorkbookInput = styled(Input)`
  width: 50px;
  height: 30px;
`;

export const WorkbookDeleteButton = styled(Button)`
  width: 40px;

  border: 1px solid ${colors.error};
  border-radius: 0;

  font-size: ${fonts.size.xs};

  :hover {
    color: ${colors.white};
    background-color: ${colors.error};
  }
`;
