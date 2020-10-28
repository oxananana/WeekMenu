import styled from "styled-components";
import mediaQuery from "../../theme/mediaQuery";

export const Container = styled.div`
  padding: 0 16px;
  margin: 0 auto;
  max-width: calc((260px * 5) + (264px * 2) + (32px * 2) - 16px);

  ${mediaQuery.greaterThen("small")`
    padding: 0 24px;
  `}

  ${mediaQuery.greaterThen("medium")`
    padding: 0 32px;
  `}
`;
