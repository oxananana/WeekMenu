import React from "react";
import styled from "styled-components";
import { ContentContainer } from "./ContentContainer";
import mediaQuery from "../../theme/mediaQuery";

const InnerPage = (props) => {
  return (
    <Inner>
      <ContentContainer>{props.children}</ContentContainer>
    </Inner>
  );
};

export const Inner = styled.div`
  padding: 16px 0;
  flex: 1;

  ${mediaQuery.greaterThen("small")`
    padding: 24px 0;
  `}

  ${mediaQuery.greaterThen("medium")`
    padding: 32px 0;
  `}
`;

export default InnerPage;
