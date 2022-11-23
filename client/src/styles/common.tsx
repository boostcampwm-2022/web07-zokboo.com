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
  }
`;

export const Form = styled.ul``;
