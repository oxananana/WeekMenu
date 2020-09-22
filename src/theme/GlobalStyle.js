import { createGlobalStyle } from "styled-components";
import reset from "./styled-reset";
import normalize from "./styled-normalize";
import { textColors, bgColors } from "./variables";

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${normalize}

  body {
    background-color: ${bgColors.base};
    font-size: 16px;
    color: ${textColors.base};
  }

  p {
    margin: 12px 0;
  }

  svg {
    display: block;
    width: 16px;
    height: 16px;
    fill: currentColor;
    fill-rule: evenodd;
    clip-rule: evenodd;

  }
`;

export default GlobalStyle;
