import React from "react";
import styled from "styled-components";

const Loader = (props) => {
  return (
    <LoaderIcon {...props}>
      <svg viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="20"></circle>
      </svg>
    </LoaderIcon>
  );
};

const LoaderIcon = styled.span`
  animation: rotate 2s linear infinite;
  width: ${(props) => props.size || 16}px;
  height: ${(props) => props.size || 16}px;

  svg {
    width: 100%;
    height: 100%;
  }

  circle {
    fill: none;
    stroke-width: 5;
    stroke: ${({ theme, invert }) =>
      invert ? theme.bg.baseLight : theme.bg.primary};
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
