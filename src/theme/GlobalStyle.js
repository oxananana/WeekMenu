import { createGlobalStyle } from "styled-components";
import reset from "./styled-reset";
import normalize from "./styled-normalize";

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${normalize}

  html {
    height: -webkit-fill-available;
    @supports (-webkit-touch-callout: none) {
    /* The hack for Safari */
      height: -webkit-fill-available;
    }
  }

  body {
    font-family: "Nunito", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${({ theme }) => theme.bg.baseLight};
    font-size: 16px;
    color: ${({ theme }) => theme.text.base};
  }

  p {
    margin: 12px 0;
  }

  img {
    max-width: 100%;
  }

  svg {
    display: block;
    width: 16px;
    height: 16px;
    fill: currentColor;
    fill-rule: evenodd;
    clip-rule: evenodd;

  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    @supports (-webkit-touch-callout: none) {
    /* The hack for Safari */
      min-height: -webkit-fill-available;
    }
  }
`;

export default GlobalStyle;
