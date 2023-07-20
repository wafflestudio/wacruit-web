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
  `;

export default GlobalStyles;
