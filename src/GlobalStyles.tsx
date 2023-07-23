import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset}
  body {
    * {
      font-family: Pretendard, sans-serif;
      box-sizing: border-box;
      list-style-type: none;
      text-decoration: none;
      border-collapse: collapse;
    }
  }
  a {
      text-decoration: none;
      color: inherit;
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
