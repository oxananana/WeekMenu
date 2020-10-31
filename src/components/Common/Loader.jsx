import React from "react";
import styled, { keyframes } from "styled-components";

const Loader = (props) => {
  return props.circle ? (
    <LoaderCircle {...props}>
      <svg viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="20"></circle>
      </svg>
    </LoaderCircle>
  ) : (
    <LoaderBarContainer>
      <LoaderBar />
    </LoaderBarContainer>
  );
};

const LoaderBarContainer = styled.div`
  position: fixed;
  z-index: 1001;
  left: 0;
  top: 0;
  height: 2px;
  width: 100%;
  background-color: ${({ theme }) => theme.bg.loader};
`;

const bar = keyframes`
 0% {
    width: 0;
  }
  40% {
    width: 50%;
  }
  100% {
    width: 100%;
  }
`;

const LoaderBar = styled.div`
  height: 2px;
  width: 0;
  background-color: ${({ theme }) => theme.bg.primary};
  animation: ${bar} 3s ease-out;
`;

const LoaderCircle = styled.span`
  animation: rotate 2s linear infinite;
  width: ${(props) => props.size || 16}px;
  height: ${(props) => props.size || 16}px;
  display: block;
  color: ${({ theme }) => theme.bg.baseLight};

  svg {
    width: 100%;
    height: 100%;
  }

  circle {
    fill: none;
    stroke-width: 5;
    stroke: currentColor;
    stroke-linecap: round;
    animation: dash 1s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
      transform-origin: center;
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

export default Loader;
