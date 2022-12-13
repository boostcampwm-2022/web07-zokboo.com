import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }


  *::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #f5f5f5;
  }

  *::-webkit-scrollbar {
    width: 5px;
    background-color: #f5f5f5;
  }

  *::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #555;
  }

  body {
      margin: 0;
  }
`;

export default GlobalStyle;
