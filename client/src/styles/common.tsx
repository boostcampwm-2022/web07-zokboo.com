import styled from 'styled-components';
import { colors, fonts } from './theme';

export const Button = styled.button`
  color: ${colors.primary};
  border: 1px solid ${colors.primary};
  background-color: ${colors.white};
  border-radius: 5px;

  font-size: ${fonts.size.sm};

  transition: all 0.5s;
  cursor: pointer;

  :hover {
    color: ${colors.white};
    background-color: ${colors.primary};
  }
`;

export const Input = styled.input`
  color: ${colors.text};
  font-size: ${fonts.size.sm};
  width: 100%;

  resize: none;
  border: 1px solid ${colors.line};

  ::placeholder {
    color: ${colors.placeholder};
  }

  :focus {
    outline: none;
    border: 1px solid ${colors.primary};
  }
`;

export const TextArea = styled.textarea`
  color: ${colors.text};
  font-size: ${fonts.size.sm};
  width: 100%;

  resize: none;
  border: 1px solid ${colors.line};

  ::placeholder {
    color: ${colors.placeholder};
  }

  :focus {
    outline: none;
    border: 1px solid ${colors.primary};
  }
`;

export const MainTitle = styled.h1`
  margin: 0;
  padding: 0;

  font-weight: ${fonts.weight.bold};
`;

export const SubTitle = styled.h2`
  margin: 0;
  padding: 0;

  margin-bottom: 10px;

  font-size: ${fonts.size.xl};
  font-weight: ${fonts.weight.bold};
`;

export const List = styled.ul`
  list-style-type: none;

  margin: 0;
  padding: 0;

  overflow-y: auto;
`;

export const Item = styled.li`
  box-sizing: border-box;
  padding: 10px;

  margin: 10px 0;
  padding: 0;
`;
