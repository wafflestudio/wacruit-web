import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset}
  html {
    font-size: 62.5%;
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }

  body {
    * {
      font-family: Pretendard, sans-serif;
      box-sizing: border-box;
      text-decoration: none;
      border-collapse: collapse;
    }
  }
  
  ul, ol {
    list-style-type: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    background-color: transparent;
    border: none;
    padding: 0;
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }
  
  pre {
    font-family: monospace;
  }

  @font-face {
    font-family: 'Jalnan';
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.2/JalnanOTF00.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  } 
`;

export default GlobalStyles;
