import styled from 'styled-components';
import { fonts } from '../../../styles/theme';

export const WorkbookContainer = styled.div`
  width: 100%;
  height: 100%;
`;
export const Header = styled.div`
  font-size: ${fonts.size.xl};
  font-weight: ${fonts.weight.normal};
`;

export const Main = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: ${fonts.weight.bold};
  font-size: ${fonts.size.xl};
`;
