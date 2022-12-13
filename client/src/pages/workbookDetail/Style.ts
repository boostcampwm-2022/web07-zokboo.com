import styled from 'styled-components';
import { colors, fonts, media } from '../../styles/theme';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  height: 100%;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  ${media.mobileLength} {
    justify-content: flex-start;
  }

  gap: 8px;

  background-color: ${colors.secondary};
  padding: 20px 0;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  ${media.tablet} {
    width: 80%;
  }
  ${media.mobileWidth} {
    width: 100%;
  }
  padding: 0px 30px;
`;

export const WorkbookIntroduce = styled.div`
  margin-bottom: 30px;
`;
export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const WorkbookSaveButton = styled.input`
  padding: 10px 20px;

  border: 1.5px solid ${colors.primary};
  border-radius: 8px;

  :hover {
    opacity: 0.8;
  }

  :active {
    opacity: 0.5;
  }
`;

export const Heart = styled.button`
  background: none;
  border: none;
`;

export const Title = styled.div`
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.3px;
  line-height: 1.5;
`;
export const IsPublic = styled.div`
  display: inline-block;

  background-color: ${colors.primary};
  color: ${colors.white};

  border: none;
  border-radius: 4px;
  font-size: ${fonts.size.xs};
  font-weight: 500;
  padding: 2px 4px;
`;
export const Description = styled.div``;

export const BodyTitle = styled.div`
  font-weight: ${fonts.weight.bold};
  font-size: ${fonts.size.xl};

  margin-top: 20px;
`;

export const ProblemListContainer = styled.div`
  display: flex;
  justify-content: center;
  ${media.mobileWidth} {
    justify-content: flex-start;
  }

  margin: 0 10px;
`;
export const ProblemList = styled.div`
  width: 800px;
  ${media.tablet} {
    width: 80%;
  }
  ${media.mobileWidth} {
    width: 100%;
  }
`;
