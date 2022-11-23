import { createGlobalStyle } from 'styled-components';
import { colors, fonts } from './theme';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }


  *::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
  }

  *::-webkit-scrollbar {
    width: 5px;
    background-color: #f5f5f5;
  }

  *::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #555;
  }

  input,
  textarea {
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
  }

  body {
      margin: 0;
  }
`;

export default GlobalStyle;
