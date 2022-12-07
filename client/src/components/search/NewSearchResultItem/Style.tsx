import styled from 'styled-components';
import { colors, fonts } from '../../../styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  background-color: #fff;

  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  width: 300px;
  height: 370px;

  cursor: pointer;
`;
export const WorkbookImage = styled.img`
  border: 1px solid black;
  border-radius: 6px 6px 0 0;
  width: 100%;
  height: 170px;

  object-fit: cover;
  object-position: center;
`;
export const WorkbookContent = styled.div`
  display: flex;
  flex-direction: column;

  margin: 12px;
`;
export const Title = styled.div`
  font-size: ${fonts.size.lg};
  font-weight: ${fonts.weight.bold};
  margin-bottom: 8px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const DescriptionContainer = styled.div`
  color: ${colors.gray3};
  font-size: ${fonts.size.xs};

  height: 110px;
`;

export const Description = styled.div`
  height: 80%;
  overflow: hidden;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  border-top: 1px solid ${colors.gray2};

  color: ${colors.gray4};
  font-size: ${fonts.size.xs};

  padding-top: 12px;
`;

export const CreatorContainer = styled.div`
  display: flex;
`;

export const Creator = styled.div`
  padding-right: 8px;
`;
export const CreateAt = styled.div``;
export const Heart = styled.button`
  background: none;
  border: none;
  .fillStyled {
    color: ${colors.primary};
  }
`;
