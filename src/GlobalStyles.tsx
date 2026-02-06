import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset}
  html {
    font-size: 62.5%;
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    font-family: Pretendard, sans-serif;
    text-decoration: none;
    border-collapse: collapse;
    word-break: keep-all;
    overflow-wrap: break-word;
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

  @font-face {
    font-family: 'GMarketSans';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansLight.woff') format('woff');
    font-weight: 300;
    font-display: swap;
  }

  @font-face {
    font-family: 'GMarketSans';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
    font-weight: 500;
    font-display: swap;
  }
`;

export default GlobalStyles;
