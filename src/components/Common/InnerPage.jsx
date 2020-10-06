import React from "react";
import styled from "styled-components";
import { Container } from "./Container";

const InnerPage = (props) => {
  console.log("inner");
  return (
    <Inner>
      <Container>{props.children}</Container>
    </Inner>
  );
};

export const Inner = styled.div`
  padding-top: 32px;
  flex: 1;
`;

export default InnerPage;
